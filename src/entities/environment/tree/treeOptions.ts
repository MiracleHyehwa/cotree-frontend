import { BarkType, Billboard, LeafType, TreeType } from "./enums";

export class TreeOptions {
  /** 시드값 (재현 가능성) */
  public seed: number;

  /** 트리 타입: 낙엽수 or 침엽수 */
  public type: TreeType;

  /** 나무 껍질 설정 */
  public bark: {
    type: BarkType;
    tint: number;
    flatShading: boolean;
    textured: boolean;
    textureScale: { x: number; y: number };
  };

  /** 가지 설정 */
  public branch: {
    levels: number;
    angle: Record<number, number>;
    children: Record<number, number>;
    force: {
      direction: { x: number; y: number; z: number };
      strength: number;
    };
    gnarliness: Record<number, number>;
    length: Record<number, number>;
    radius: Record<number, number>;
    sections: Record<number, number>;
    segments: Record<number, number>;
    start: Record<number, number>;
    taper: Record<number, number>;
    twist: Record<number, number>;
  };

  /** 잎 설정 */
  public leaves: {
    type: LeafType;
    billboard: Billboard;
    angle: number;
    count: number;
    start: number;
    size: number;
    sizeVariance: number;
    tint: number;
    alphaTest: number;
  };

  /**
   * 생성자 - 기본 트리 설정을 초기화함
   */
  constructor() {
    this.seed = 0;
    this.type = TreeType.Deciduous;

    this.bark = {
      type: BarkType.Oak,
      tint: 0xffffff,
      flatShading: false,
      textured: true,
      textureScale: { x: 1, y: 1 },
    };

    this.branch = {
      levels: 3,
      angle: { 1: 70, 2: 60, 3: 60 },
      children: { 0: 7, 1: 7, 2: 5 },
      force: {
        direction: { x: 0, y: 1, z: 0 },
        strength: 0.01,
      },
      gnarliness: { 0: 0.15, 1: 0.2, 2: 0.3, 3: 0.02 },
      length: { 0: 20, 1: 20, 2: 10, 3: 1 },
      radius: { 0: 1.5, 1: 0.7, 2: 0.7, 3: 0.7 },
      sections: { 0: 12, 1: 10, 2: 8, 3: 6 },
      segments: { 0: 8, 1: 6, 2: 4, 3: 3 },
      start: { 1: 0.4, 2: 0.3, 3: 0.3 },
      taper: { 0: 0.7, 1: 0.7, 2: 0.7, 3: 0.7 },
      twist: { 0: 0, 1: 0, 2: 0, 3: 0 },
    };

    this.leaves = {
      type: LeafType.Oak,
      billboard: Billboard.Double,
      angle: 10,
      count: 1,
      start: 0,
      size: 2.5,
      sizeVariance: 0.7,
      tint: 0xffffff,
      alphaTest: 0.5,
    };
  }

  /**
   * 객체의 속성을 깊은 복사로 복사합니다
   * @param source 복사할 원본 객체
   * @param target 복사될 대상 객체 (기본값: this)
   */
  copy(source: Partial<TreeOptions>, target: TreeOptions = this): void {
    // 기본 속성들 직접 처리
    if (source.seed !== undefined) target.seed = source.seed;
    if (source.type !== undefined) target.type = source.type;

    // 객체 속성들 처리
    if (source.bark) {
      if (typeof target.bark === "object" && target.bark !== null) {
        this.copyObject(source.bark, target.bark);
      }
    }

    if (source.branch) {
      if (typeof target.branch === "object" && target.branch !== null) {
        this.copyObject(source.branch, target.branch);
      }
    }

    if (source.leaves) {
      if (typeof target.leaves === "object" && target.leaves !== null) {
        this.copyObject(source.leaves, target.leaves);
      }
    }
  }

  /**
   * 객체의 속성을 재귀적으로 복사하는 헬퍼 메서드
   */
  private copyObject<T extends Record<string, unknown>>(source: Partial<T>, target: T): void {
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key) && Object.prototype.hasOwnProperty.call(target, key)) {
        const sourceValue = source[key];
        const targetValue = target[key];

        const isPlainObject = (val: unknown) =>
          typeof val === "object" && val !== null && Object.getPrototypeOf(val) === Object.prototype;

        if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
          this.copyObject(sourceValue as Record<string, unknown>, targetValue as Record<string, unknown>);
        } else if (sourceValue !== undefined) {
          (target as Record<string, unknown>)[key] = sourceValue;
        }
      }
    }
  }
}
