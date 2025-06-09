/**
 * 의사 난수 생성기 (Pseudo-Random Number Generator)
 * - 고정된 seed로부터 결정적인 난수를 생성할 수 있음
 * - 내부적으로 `m_w`, `m_z` 값을 이용한 선형 합동 방식 사용
 */
export class RNG {
  private m_w: number = 123456789;
  private m_z: number = 987654321;
  private readonly mask: number = 0xffffffff;

  /**
   * 생성자
   * @param seed 시드값 (정수)
   */
  constructor(seed: number) {
    this.m_w = (123456789 + seed) & this.mask;
    this.m_z = (987654321 - seed) & this.mask;
  }

  /**
   * 주어진 범위 내에서 난수를 반환
   * @param max 최댓값 (기본값: 1)
   * @param min 최솟값 (기본값: 0)
   * @returns min 이상 max 미만의 난수
   */
  public random(max: number = 1, min: number = 0): number {
    this.m_z = (36969 * (this.m_z & 65535) + (this.m_z >>> 16)) & this.mask;
    this.m_w = (18000 * (this.m_w & 65535) + (this.m_w >>> 16)) & this.mask;

    let result = ((this.m_z << 16) + (this.m_w & 65535)) >>> 0;
    result /= 4294967296;

    return (max - min) * result + min;
  }
}
