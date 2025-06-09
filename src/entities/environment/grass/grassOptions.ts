/**
 * 풀과 꽃의 배치, 크기, 바람 효과 등을 설정하기 위한 옵션 클래스
 */
export class GrassOptions {
  /**
   * 기본 풀 인스턴스 개수
   */
  instanceCount = 16;

  /**
   * 허용 가능한 최대 풀 인스턴스 개수
   */
  maxInstanceCount = 25000;

  /**
   * 꽃 인스턴스 개수
   */
  flowerCount = 50;

  /**
   * 노이즈 샘플링 스케일 (배치 밀도 및 패턴 제어)
   */
  scale = 200;

  /**
   * 풀과 꽃의 조밀함 정도 (0~1 사이값, 값이 높을수록 희박)
   */
  patchiness = 0.7;

  /**
   * 기본 풀 크기
   */
  size = { x: 5, y: 4, z: 5 };

  /**
   * 풀의 랜덤한 크기 변화 범위
   */
  sizeVariation = { x: 1, y: 2, z: 1 };

  /**
   * 바람의 힘 (방향 및 크기)
   */
  windStrength = { x: 0.3, y: 0, z: 0.3 };

  /**
   * 바람의 진동 속도 (주파수)
   */
  windFrequency = 1.0;

  /**
   * 바람 노이즈 샘플링 공간 스케일
   */
  windScale = 400.0;
}
