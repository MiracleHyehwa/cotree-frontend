import * as THREE from "three";

type CloudsUniforms = {
  uTime: { value: number };
};

type ShaderWithCloudUniforms = Parameters<NonNullable<THREE.MeshBasicMaterial["onBeforeCompile"]>>[0] & {
  uniforms: CloudsUniforms & Parameters<NonNullable<THREE.MeshBasicMaterial["onBeforeCompile"]>>[0]["uniforms"];
};

type CloudShaderMaterial = THREE.MeshBasicMaterial & {
  userData: {
    shader?: ShaderWithCloudUniforms;
  };
};

/**
 * 구름을 렌더링하는 클래스.
 * - PlaneGeometry 위에 Simplex noise 기반 애니메이션 구름 효과 생성
 * - MeshBasicMaterial의 onBeforeCompile을 이용한 커스텀 쉐이더 적용
 */

export class Clouds extends THREE.Mesh {
  private materialInstance: CloudShaderMaterial;

  /**
   * Clouds 생성자
   * - PlaneGeometry 및 커스텀 쉐이더가 적용된 Mesh를 초기화
   */

  constructor() {
    const geometry = new THREE.PlaneGeometry(2000, 2000);

    const material = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.9,
      fog: true,
    }) as CloudShaderMaterial;

    super(geometry, material);

    this.materialInstance = material;

    this.materialInstance.onBeforeCompile = (
      shader: Parameters<NonNullable<THREE.MeshBasicMaterial["onBeforeCompile"]>>[0]
    ) => {
      shader.uniforms.uTime = { value: 0.0 };

      shader.vertexShader =
        `
        varying vec2 vUv;
        varying vec3 vWorldPosition;
        ` + shader.vertexShader;

      shader.fragmentShader =
        `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vWorldPosition;
        ` + shader.fragmentShader;

      shader.vertexShader = shader.vertexShader.replace(
        "#include <worldpos_vertex>",
        `#include <worldpos_vertex>
         vUv = uv;
         vWorldPosition = worldPosition.xyz;
        `
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        `void main() {`,
        `// 2D Simplex noise function
        vec3 permute(vec3 x) {
          return mod(((x*34.0)+1.0)*x, 289.0);
        }

        float snoise(vec2 v){
          const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m ;
          m = m*m ;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {`
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <map_fragment>",
        `
        float n = snoise(vUv * 5.0 + uTime / 40.0) + snoise(vUv * 10.0 + uTime / 30.0); 
        float cloud = smoothstep(0.2, 0.8, 0.5 * n + 0.4);
        vec4 cloudColor = vec4(1.0, 1.0, 1.0, 1.0); 
        diffuseColor = vec4(1.0, 1.0, 1.0, cloud * opacity / (0.01 * length(vWorldPosition)));
        `
      );

      this.materialInstance.userData.shader = shader as ShaderWithCloudUniforms;
    };
  }

  /**
   * 애니메이션 업데이트 함수
   * @param elapsedTime - 경과 시간 (초)
   * - shader의 uTime uniform을 갱신하여 noise 기반 구름을 움직이게 함
   */

  update(elapsedTime: number): void {
    const shader = this.materialInstance.userData.shader;
    if (shader && shader.uniforms.uTime) {
      shader.uniforms.uTime.value = elapsedTime;
    }
  }
}
