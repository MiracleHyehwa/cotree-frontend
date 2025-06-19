import * as THREE from "three";

/**
 * SkyboxOptions 클래스
 * - Skybox 클래스에서 사용하는 하늘/태양 표현 설정값을 담는 객체
 */
export class SkyboxOptions {
  /**
   * 태양의 방위각 (Azimuth)
   * - 0° = 북쪽, 90° = 동쪽, 180° = 남쪽, 270° = 서쪽
   */
  sunAzimuth = 90;

  /**
   * 태양의 고도각 (Elevation)
   * - 0° = 지평선, 90° = 정오(머리 위)
   */
  sunElevation = 30;

  /**
   * 태양의 색상 (DirectionalLight + 쉐이더에 적용됨)
   * - sRGB 색 공간으로 변환됨
   */
  sunColor = new THREE.Color(0xffe5b0).convertLinearToSRGB();

  /**
   * 쉐이더에서 사용되는 태양의 시각적 크기
   */
  sunSize = 1;

  /**
   * 하늘의 하단 색상 (지평선 근처 색상)
   * - sRGB 색 공간으로 변환됨
   */
  skyColorLow = new THREE.Color(0x6fa2ef).convertLinearToSRGB();

  /**
   * 하늘의 상단 색상 (천정 방향 색상)
   * - sRGB 색 공간으로 변환됨
   */
  skyColorHigh = new THREE.Color(0x4f79ff).convertLinearToSRGB();
}
