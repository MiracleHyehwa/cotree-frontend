import * as THREE from "three";
import { GrassOptions } from "@/entities/environment/grass";

/**
 * 지면(Ground)을 표현하는 클래스
 * - PlaneGeometry 기반 Mesh로 구성
 * - GrassOptions를 기반으로 노이즈 기반 텍스처 블렌딩 처리
 * - grass, dirt 텍스처와 노멀맵 사용
 * - onBeforeCompile을 통해 커스텀 쉐이더 삽입
 */

export class Ground extends THREE.Mesh {
  private options: GrassOptions;

  private grassTexture!: THREE.Texture;
  private dirtTexture!: THREE.Texture;
  private dirtNormal!: THREE.Texture;
  private loaded = false;

  /**
   * 지면 생성자
   * @param options GrassOptions (노이즈 스케일, patchiness 등)
   */

  constructor(options = new GrassOptions()) {
    super();
    this.options = options;
    this.rotation.x = -Math.PI / 2;
    this.receiveShadow = true;

    this.init();
  }

  /**
   * 텍스처를 비동기 로딩하고, 머티리얼과 geometry 설정
   * - loadAsync: grass.jpg, dirt_color.jpg, dirt_normal.jpg
   */

  private async init() {
    if (this.loaded) return;

    const loader = new THREE.TextureLoader();
    const [grass, dirt, dirtN] = await Promise.all([
      loader.loadAsync("./environment/grass.jpg"),
      loader.loadAsync("./environment/dirt_color.jpg"),
      loader.loadAsync("./environment/dirt_normal.jpg"),
    ]);

    [grass, dirt].forEach((t) => {
      t.wrapS = THREE.RepeatWrapping;
      t.wrapT = THREE.RepeatWrapping;
      t.colorSpace = THREE.SRGBColorSpace;
      t.generateMipmaps = false;
      t.minFilter = THREE.LinearFilter;
      t.magFilter = THREE.LinearFilter;
    });

    dirtN.wrapS = dirtN.wrapT = THREE.RepeatWrapping;

    this.grassTexture = grass;
    this.dirtTexture = dirt;
    this.dirtNormal = dirtN;
    this.loaded = true;

    this.geometry = new THREE.PlaneGeometry(2000, 2000);
    this.material = new THREE.MeshPhongMaterial({
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.01,
      normalMap: this.dirtNormal,
      shininess: 0.1,
    });

    this.extendShader(this.material);
  }

  /**
   * Material의 onBeforeCompile을 통해 쉐이더 확장
   * - Simplex2D noise 기반으로 grass/dirt 텍스처 블렌딩
   * - normalMap과 함께 동작
   */

  private extendShader(material: THREE.Material) {
    material.onBeforeCompile = (shader) => {
      shader.uniforms.uNoiseScale = { value: this.options.scale };
      shader.uniforms.uPatchiness = { value: this.options.patchiness };
      shader.uniforms.uGrassTexture = { value: this.grassTexture };
      shader.uniforms.uDirtTexture = { value: this.dirtTexture };

      shader.vertexShader = `varying vec3 vWorldPosition;\n` + shader.vertexShader;

      shader.fragmentShader =
        `
        varying vec3 vWorldPosition;
        uniform float uNoiseScale;
        uniform float uPatchiness;
        uniform sampler2D uGrassTexture;
        uniform sampler2D uDirtTexture;
        ` + shader.fragmentShader;

      shader.vertexShader = shader.vertexShader.replace(
        "#include <worldpos_vertex>",
        `#include <worldpos_vertex>
         vWorldPosition = worldPosition.xyz;
        `
      );

      shader.fragmentShader = shader.fragmentShader.replace(
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
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m * m * m * m;

          vec3 x = 2.0 * fract(p * 0.024390243902439) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;

          m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

          vec3 g;
          g.x = a0.x * x0.x + h.x * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
        `
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <map_fragment>",
        `
        vec2 uv = vec2(vWorldPosition.x, vWorldPosition.z);
        vec3 grassColor = texture2D(uGrassTexture, uv / 30.0).rgb;
        vec3 dirtColor = texture2D(uDirtTexture, uv / 30.0).rgb;

        float n = 0.5 + 0.5 * simplex2d(uv / uNoiseScale);
        float s = smoothstep(uPatchiness - 0.1, uPatchiness + 0.1, n);

        vec4 sampledDiffuseColor = vec4(mix(grassColor, dirtColor, s), 1.0);
        diffuseColor *= sampledDiffuseColor;
        `
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <normal_fragment_maps>",
        `
        vec3 mapN = texture2D(normalMap, uv / 30.0).xyz * 2.0 - 1.0;
        mapN.xy *= normalScale;
        normal = normalize(tbn * mapN);
        `
      );

      material.userData.shader = shader;
    };
  }
}
