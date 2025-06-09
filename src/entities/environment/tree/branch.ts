import * as THREE from "three";

/**
 * 나무 가지 한 개를 표현하는 클래스
 */
export class Branch {
  /** 시작 위치 */
  public origin: THREE.Vector3;

  /** 방향 (Euler 회전값) */
  public orientation: THREE.Euler;

  /** 가지의 길이 */
  public length: number;

  /** 가지의 시작 반지름 */
  public radius: number;

  /** 가지의 계층 수준 (0 = 줄기) */
  public level: number;

  /** 이 가지의 단면 횟수 (길이 방향 분할 수) */
  public sectionCount: number;

  /** 단면을 구성하는 세그먼트 수 (원형 단면의 면 수) */
  public segmentCount: number;

  /**
   * 새로운 Branch 객체 생성
   * @param origin 시작 위치
   * @param orientation 시작 방향
   * @param length 가지 길이
   * @param radius 가지 시작 반지름
   * @param level 계층 수준 (0 = 줄기)
   * @param sectionCount 길이 방향 분할 수
   * @param segmentCount 원형 단면 세그먼트 수
   */
  constructor(
    origin: THREE.Vector3 = new THREE.Vector3(),
    orientation: THREE.Euler = new THREE.Euler(),
    length: number = 0,
    radius: number = 0,
    level: number = 0,
    sectionCount: number = 0,
    segmentCount: number = 0
  ) {
    this.origin = origin.clone();
    this.orientation = orientation.clone();
    this.length = length;
    this.radius = radius;
    this.level = level;
    this.sectionCount = sectionCount;
    this.segmentCount = segmentCount;
  }
}
