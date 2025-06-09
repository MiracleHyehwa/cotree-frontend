import * as THREE from "three";
import { simplex2d } from "@/shared/lib/noise";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { GrassOptions } from "@/entities/environment/grass";

type WindShaderMaterial = THREE.Material & {
  userData: {
    shader?: {
      uniforms: {
        uTime: { value: number };
      };
    };
  };
};

function isWindShaderMaterial(mat: THREE.Material): mat is WindShaderMaterial {
  return !!mat.userData?.shader?.uniforms?.uTime;
}

/**
 * Grass 인스턴스 필드 렌더링 클래스
 * - GLTF로부터 풀/꽃 모델을 로드하고,
 * - 인스턴스 기반 풀 생성 및 바람 애니메이션 적용
 */

export class Grass extends THREE.Object3D {
  private _ready: Promise<void>;
  private _resolveReady!: () => void;
  private options: GrassOptions;
  private flowers = new THREE.Group();
  private grassMesh!: THREE.InstancedMesh;

  private grassModel!: THREE.Mesh;
  private flowerModels: Record<string, THREE.Mesh> = {};

  constructor(options: GrassOptions = new GrassOptions()) {
    super();
    this.options = options;
    this.add(this.flowers);

    this._ready = new Promise((res) => {
      this._resolveReady = res;
    });

    this.loadAssets().then(() => {
      this.generateFlowers("flower_white");
      this.generateFlowers("flower_blue");
      this.generateFlowers("flower_yellow");
      this._resolveReady(); // 준비 완료
    });
  }

  get instanceCount(): number {
    return this.grassMesh?.count ?? this.options.instanceCount;
  }

  set instanceCount(value: number) {
    this.grassMesh.count = value;
  }

  /**
   * 내부 모델/데이터 로딩이 완료될 때까지 기다림
   * @returns 준비 완료 후 resolve되는 Promise
   */
  public async whenReady(): Promise<void> {
    return this._ready;
  }

  /**
   * GLTF로부터 풀, 꽃 모델을 로드함
   */
  public async loadAssets(): Promise<void> {
    const loader = new GLTFLoader();
    const loadModel = async (path: string): Promise<THREE.Mesh> => {
      const model = (await loader.loadAsync(path)).scene.children[0] as THREE.Mesh;
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;

          const standard = mesh.material as THREE.MeshStandardMaterial;
          if (standard.map) {
            mesh.material = new THREE.MeshPhongMaterial({ map: standard.map });
            this.appendWindShader(mesh.material);
          }
        }
      });
      return model;
    };

    this.grassModel = await loadModel("grass.glb");
    this.flowerModels["flower_white"] = await loadModel("./environment/flower_white.glb");
    this.flowerModels["flower_blue"] = await loadModel("./environment/flower_blue.glb");
    this.flowerModels["flower_yellow"] = await loadModel("./environment/flower_yellow.glb");
  }

  /**
   * 풀 인스턴스 수를 재설정하고, 렌더링 데이터 갱신
   * @param count - 새로 설정할 풀 개수
   */
  public setGrassAmount(count: number) {
    if (!this.grassMesh) return;
    this.options.instanceCount = Math.min(count, this.options.maxInstanceCount);
    this.grassMesh.count = this.options.instanceCount;
    this.grassMesh.instanceMatrix.needsUpdate = true;
    this.grassMesh.instanceColor!.needsUpdate = true;
  }

  /**
   * 바람 애니메이션 업데이트
   * @param elapsedTime 경과 시간 (초)
   */
  public update(elapsedTime: number): void {
    this.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;

      const materials = Array.isArray(obj.material) ? obj.material : [obj.material];

      materials.filter(isWindShaderMaterial).forEach((mat) => {
        mat.userData.shader!.uniforms.uTime.value = elapsedTime;
      });
    });
  }

  /**
   * 풀 인스턴스 생성
   * @param count 생성할 인스턴스 수 (선택)
   */
  public generateGrass(count?: number): void {
    if (count !== undefined) {
      this.options.instanceCount = Math.min(count, this.options.maxInstanceCount);
    }

    const material = new THREE.MeshPhongMaterial({
      map: (this.grassModel.material as THREE.MeshStandardMaterial).map,
      emissive: new THREE.Color(0x308040),
      emissiveIntensity: 0.05,
      alphaTest: 0.5,
      depthTest: true,
      depthWrite: true,
      side: THREE.DoubleSide,
    });

    this.appendWindShader(material, true);
    material.color.multiplyScalar(0.6);

    this.grassMesh = new THREE.InstancedMesh(this.grassModel.geometry, material, this.options.maxInstanceCount);

    this.generateGrassInstances(); // count는 this.options.instanceCount 사용
    this.add(this.grassMesh);
  }

  /**
   * 생성된 풀 인스턴스들의 위치, 회전, 크기, 색상을 무작위로 배치
   */

  private generateGrassInstances(): void {
    const dummy = new THREE.Object3D();
    let count = 0;

    for (let i = 0; i < this.options.maxInstanceCount; i++) {
      const r = 10 + Math.random() * 500;
      const theta = Math.random() * 2 * Math.PI;
      const p = new THREE.Vector3(r * Math.cos(theta), 0, r * Math.sin(theta));
      const n = 0.5 + 0.5 * simplex2d(new THREE.Vector2(p.x / this.options.scale, p.z / this.options.scale));
      if (n > this.options.patchiness && Math.random() + 0.6 > this.options.patchiness) continue;

      dummy.position.copy(p);
      dummy.rotation.set(0, Math.random() * Math.PI * 2, 0);
      dummy.scale.set(
        this.options.size.x + this.options.sizeVariation.x * Math.random(),
        this.options.size.y + this.options.sizeVariation.y * Math.random(),
        this.options.size.z + this.options.sizeVariation.z * Math.random()
      );

      dummy.updateMatrix();
      this.grassMesh.setMatrixAt(count, dummy.matrix);

      const color = new THREE.Color(0.25 + Math.random() * 0.1, 0.3 + Math.random() * 0.3, 0.1);
      this.grassMesh.setColorAt(count, color);
      count++;
    }

    this.grassMesh.count = this.options.instanceCount;
    this.grassMesh.castShadow = true;
    this.grassMesh.receiveShadow = true;
    this.grassMesh.instanceMatrix.needsUpdate = true;
    this.grassMesh.instanceColor!.needsUpdate = true;
  }

  /**
   * 특정 이름의 꽃을 랜덤하게 배치함
   * @param name - flower_white, flower_blue, flower_yellow 중 하나
   */
  private generateFlowers(name: string): void {
    const flowerMesh = this.flowerModels[name];
    if (!flowerMesh) return;

    for (let i = 0; i < this.options.flowerCount; i++) {
      const r = 10 + Math.random() * 200;
      const theta = Math.random() * 2 * Math.PI;
      const p = new THREE.Vector3(r * Math.cos(theta), 0, r * Math.sin(theta));
      const n = 0.5 + 0.5 * simplex2d(new THREE.Vector2(p.x / this.options.scale, p.z / this.options.scale));
      if (n > this.options.patchiness && Math.random() + 0.8 > this.options.patchiness) continue;

      const flower = flowerMesh.clone();
      flower.position.copy(p);
      flower.rotation.set(0, Math.random() * 2 * Math.PI, 0);
      const scale = 0.02 + 0.03 * Math.random();
      flower.scale.set(scale, scale, scale);
      this.flowers.add(flower);
    }
  }

  /**
   * 지정된 머티리얼에 바람 애니메이션이 적용된 커스텀 쉐이더를 삽입
   * @param material - 대상 머티리얼
   * @param instanced - 인스턴스 대상 여부 (기본 false)
   */

  private appendWindShader(material: THREE.Material, instanced = false): void {
    material.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      shader.uniforms.uWindStrength = { value: this.options.windStrength };
      shader.uniforms.uWindFrequency = { value: this.options.windFrequency };
      shader.uniforms.uWindScale = { value: this.options.windScale };

      shader.vertexShader =
        `
        uniform float uTime;
        uniform vec3 uWindStrength;
        uniform float uWindFrequency;
        uniform float uWindScale;
      ` + shader.vertexShader;

      shader.vertexShader = shader.vertexShader.replace(
        `void main() {`,
        `
        vec3 mod289(vec3 x) {
          return x - floor(x * (1.0 / 289.0)) * 289.0;
        }

        vec2 mod289(vec2 x) {
          return x - floor(x * (1.0 / 289.0)) * 289.0;
        }

        vec3 permute(vec3 x) {
          return mod289(((x * 34.0) + 1.0) * x);
        }

        float simplex2d(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
          vec2 i = floor(v + dot(v, C.yy));
          vec2 x0 = v - i + dot(i, C.xx);
          vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;

          i = mod289(i);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));

          vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
          m = m * m * m * m;

          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;

          m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

          vec3 g;
          g.x = a0.x * x0.x + h.x * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
      `
      );

      const vertexShader = instanced
        ? `
          vec4 mvPosition = instanceMatrix * vec4(transformed, 1.0);
          float windOffset = 2.0 * 3.14 * simplex2d((modelMatrix * mvPosition).xz / uWindScale);
          vec3 windSway = position.y * uWindStrength *
            sin(uTime * uWindFrequency + windOffset) *
            cos(uTime * 1.4 * uWindFrequency + windOffset);
          mvPosition.xyz += windSway;
          mvPosition = modelViewMatrix * mvPosition;
          gl_Position = projectionMatrix * mvPosition;
        `
        : `
          vec4 mvPosition = vec4(transformed, 1.0);
          float windOffset = 2.0 * 3.14 * simplex2d((modelMatrix * mvPosition).xz / uWindScale);
          vec3 windSway = 0.2 * position.y * uWindStrength *
            sin(uTime * uWindFrequency + windOffset) *
            cos(uTime * 1.4 * uWindFrequency + windOffset);
          mvPosition.xyz += windSway;
          mvPosition = modelViewMatrix * mvPosition;
          gl_Position = projectionMatrix * mvPosition;
        `;

      shader.vertexShader = shader.vertexShader.replace(`#include <project_vertex>`, vertexShader);
      material.userData.shader = shader;
    };
  }
}
