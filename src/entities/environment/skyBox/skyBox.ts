import * as THREE from "three";
import fragmentShader from "./shaders/skybox.frag?raw";
import vertexShader from "./shaders/skybox.vert?raw";
import { degToRad } from "three/src/math/MathUtils.js";
import { SkyboxOptions } from "@/entities/environment/skyBox";

function getSkyboxSettingsByTime(date = new Date()) {
  const hour = date.getHours() + date.getMinutes() / 60;

  // elevation (태양 고도): 6시~18시만 계산
  let elevation = 0;
  if (hour >= 6 && hour <= 18) {
    const t = (hour - 6) / 12;
    elevation = Math.sin(t * Math.PI) * 55;
  }

  // azimuth (태양 방위각)
  const azimuth = 90 + ((hour - 6) / 12) * 180;

  let skyColorHigh: THREE.Color;
  let skyColorLow: THREE.Color;
  let sunColor: THREE.Color;

  if (hour < 7 || hour >= 20) {
    // 🌙 밤 + 새벽 (0~6시, 20~23시)
    skyColorHigh = new THREE.Color("#000008");
    skyColorLow = new THREE.Color("#00000F");
    sunColor = new THREE.Color("#000000");
  } else if (hour >= 7 && hour < 9) {
    // 🌄 이른 아침
    skyColorHigh = new THREE.Color("#445566");
    skyColorLow = new THREE.Color("#FFA07A");
    sunColor = new THREE.Color("#FFD700");
  } else if (hour >= 9 && hour <= 16) {
    // ☀️ 낮
    skyColorHigh = new THREE.Color("#87CEEB");
    skyColorLow = new THREE.Color("#B0E0E6");
    sunColor = new THREE.Color("#FFFFFF");
  } else if (hour > 16 && hour < 20) {
    // 🌇 저녁
    skyColorHigh = new THREE.Color("#FF8C00");
    skyColorLow = new THREE.Color("#FF6347");
    sunColor = new THREE.Color("#FFD700");
  } else {
    // 저녁 (hour > 16 && hour < 20)
    skyColorHigh = new THREE.Color("#FF8C00");
    skyColorLow = new THREE.Color("#FF6347");
    sunColor = new THREE.Color("#FFD700");
  }

  return {
    sunElevation: elevation,
    sunAzimuth: azimuth,
    skyColorHigh,
    skyColorLow,
    sunColor,
  };
}

/**
 * Skybox 클래스
 * - 쉐이더 기반의 하늘 렌더링과 태양 조명을 포함한 환경 설정 클래스
 * - SphereGeometry 내부에 Sky 쉐이더를 적용하여 하늘 표현
 * - DirectionalLight와 AmbientLight를 내장하여 태양광 및 환경광 제공
 */

function createTestDate(hour: number, minute = 0) {
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute);
  return date;
}

export class Skybox extends THREE.Mesh {
  private options: SkyboxOptions;
  private sun: THREE.DirectionalLight;

  private uniforms: Record<string, THREE.IUniform>;

  /**
   * Skybox 생성자
   * @param options SkyboxOptions - 하늘 색, 태양 각도 및 크기 설정
   */
  constructor(options = new SkyboxOptions()) {
    const fakeTime = createTestDate(17);
    const timeBased = getSkyboxSettingsByTime(fakeTime);
    const mergedOptions = { ...options, ...timeBased };

    const uniforms = {
      uSunAzimuth: { value: options.sunAzimuth },
      uSunElevation: { value: options.sunElevation },
      uSunColor: { value: options.sunColor },
      uSkyColorLow: { value: options.skyColorLow },
      uSkyColorHigh: { value: options.skyColorHigh },
      uSunSize: { value: options.sunSize },
    };

    const geometry = new THREE.SphereGeometry(900, 900, 900);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      side: THREE.BackSide,
    });

    super(geometry, material);

    this.name = "Skybox";
    this.options = options;
    this.uniforms = uniforms;

    // 햇빛(DirectionalLight) 생성
    this.sun = new THREE.DirectionalLight(mergedOptions.sunColor, 5);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(512, 512);
    this.sun.shadow.camera.left = -100;
    this.sun.shadow.camera.right = 100;
    this.sun.shadow.camera.top = 100;
    this.sun.shadow.camera.bottom = -100;
    this.sun.shadow.bias = -0.001;
    this.sun.shadow.normalBias = 0.2;

    const hour = fakeTime.getHours();
    if (hour < 7 || hour >= 20) {
      this.sun.intensity = 0; // 🌙 밤에는 빛 없음
    }

    this.add(this.sun);
    this.add(new THREE.AmbientLight(0xffffff, 0.4));

    this.updateSunPosition();
  }

  /**
   * 태양(DirectionalLight)의 방향을 업데이트
   * - options.sunElevation, sunAzimuth를 기반으로 위치 계산
   */

  private updateSunPosition() {
    const el = degToRad(this.options.sunElevation);
    const az = degToRad(this.options.sunAzimuth);

    const x = 100 * Math.cos(el) * Math.sin(az);
    const y = 100 * Math.sin(el);
    const z = 100 * Math.cos(el) * Math.cos(az);

    this.sun.position.set(x, y, z);
  }

  /**
   * 태양 방위각(azimuth)을 설정
   * @param value 각도(도 단위)
   */

  set sunAzimuth(value: number) {
    this.uniforms.uSunAzimuth.value = value;
    this.options.sunAzimuth = value;
    this.updateSunPosition();
  }

  /**
   * 태양 고도(elevation)을 설정
   * @param value 각도(도 단위)
   */
  set sunElevation(value: number) {
    this.uniforms.uSunElevation.value = value;
    this.options.sunElevation = value;
    this.updateSunPosition();
  }

  /**
   * 태양 색상 설정
   * @param color THREE.Color 객체
   */
  set sunColor(color: THREE.Color) {
    this.uniforms.uSunColor.value = color;
    this.sun.color = color;
  }

  /**
   * 태양 크기 설정 (쉐이더에만 영향)
   * @param size 쉐이더 상의 태양 원형 크기
   */
  set sunSize(size: number) {
    this.uniforms.uSunSize.value = size;
  }

  /**
   * 하늘 하단 색상 설정
   * @param color THREE.Color 객체
   */
  set skyColorLow(color: THREE.Color) {
    this.uniforms.uSkyColorLow.value = color;
  }

  /**
   * 하늘 상단 색상 설정
   * @param color THREE.Color 객체
   */
  set skyColorHigh(color: THREE.Color) {
    this.uniforms.uSkyColorHigh.value = color;
  }

  /**
   * 여러 Skybox 설정을 한 번에 갱신
   * @param options Partial<SkyboxOptions> - 변경할 속성만 포함 가능
   */
  updateAll(options: Partial<SkyboxOptions>) {
    if (options.sunAzimuth !== undefined) this.sunAzimuth = options.sunAzimuth;
    if (options.sunElevation !== undefined) this.sunElevation = options.sunElevation;
    if (options.sunColor !== undefined) this.sunColor = options.sunColor;
    if (options.sunSize !== undefined) this.sunSize = options.sunSize;
    if (options.skyColorLow !== undefined) this.skyColorLow = options.skyColorLow;
    if (options.skyColorHigh !== undefined) this.skyColorHigh = options.skyColorHigh;
  }
}
