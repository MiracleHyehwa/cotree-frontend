import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { RockOptions } from "@/entities/environment/rocks";

/**
 * 텍스처가 완전히 로드될 때까지 대기
 * @param texture 대기할 THREE.Texture 객체
 */

function waitUntilTextureLoaded(texture: THREE.Texture): Promise<void> {
  return new Promise((resolve) => {
    if (texture.image) {
      resolve();
    } else {
      const interval = setInterval(() => {
        if (texture.image) {
          clearInterval(interval);
          resolve();
        }
      }, 10);
    }
  });
}

/**
 * Rocks 클래스
 * - 다양한 바위 모델을 GLTF로 로딩하여 인스턴스 기반으로 랜덤 배치함
 * - DRACO 압축 지원
 * - 크기, 회전, 위치 등은 RockOptions로 제어 가능
 */
export class Rocks extends THREE.Group {
  private options: RockOptions;
  private rockMeshes: THREE.Mesh[] = [];
  private readonly instanceCount = 50;

  /**
   * @param options 바위 배치에 대한 크기 및 랜덤성 설정
   */
  constructor(options: RockOptions = new RockOptions()) {
    super();
    this.options = options;

    this.loadAssets().then(() => {
      this.rockMeshes.forEach((mesh) => {
        const instance = this.generateInstances(mesh);
        this.add(instance);
      });
    });
  }

  /**
   * GLTF + DRACO를 통해 rock 모델 3종 로딩
   * - 텍스처가 완전히 로드될 때까지 기다림
   */

  private async loadAssets(): Promise<void> {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/");
    loader.setDRACOLoader(dracoLoader);

    const paths = ["/environment/rock1.glb", "/environment/rock2.glb", "/environment/rock3.glb"];

    const meshes = await Promise.all(
      paths.map(async (path) => {
        const result = await loader.loadAsync(path);
        const mesh = result.scene.children[0] as THREE.Mesh;

        const material = mesh.material as THREE.MeshStandardMaterial;
        if (material.map) await waitUntilTextureLoaded(material.map);
        if (material.normalMap) await waitUntilTextureLoaded(material.normalMap);
        if (material.roughnessMap) await waitUntilTextureLoaded(material.roughnessMap);

        return mesh;
      })
    );

    this.rockMeshes = meshes;
  }

  /**
   * 전달된 바위 Mesh를 기반으로 InstancedMesh 생성
   * - 무작위 위치, 회전, 크기 적용
   * @param mesh 개별 rock GLTF Mesh
   * @returns THREE.InstancedMesh
   */

  private generateInstances(mesh: THREE.Mesh): THREE.InstancedMesh {
    const instancedMesh = new THREE.InstancedMesh(mesh.geometry, mesh.material, this.instanceCount);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < this.instanceCount; i++) {
      dummy.position.set(2 * (Math.random() - 0.5) * 250, 0.3, 2 * (Math.random() - 0.5) * 250);

      dummy.rotation.set(0, 2 * Math.PI * Math.random(), 0);

      dummy.scale.set(
        this.options.sizeVariation.x * Math.random() + this.options.size.x,
        this.options.sizeVariation.y * Math.random() + this.options.size.y,
        this.options.sizeVariation.z * Math.random() + this.options.size.z
      );

      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
    }

    instancedMesh.count = this.instanceCount;
    instancedMesh.castShadow = true;
    instancedMesh.instanceMatrix.needsUpdate = true;

    return instancedMesh;
  }
}
