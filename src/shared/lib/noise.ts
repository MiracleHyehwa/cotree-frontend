import * as THREE from "three";

/**
 * 벡터의 각 성분을 289.0 기준으로 모듈로 연산
 * - GLSL의 mod289와 동일한 역할
 * @param v THREE.Vector3
 * @returns Vector3(mod289 처리된 벡터)
 */
function mod3(v: THREE.Vector3): THREE.Vector3 {
  return new THREE.Vector3(
    v.x - Math.floor(v.x / 289.0) * 289.0,
    v.y - Math.floor(v.y / 289.0) * 289.0,
    v.z - Math.floor(v.z / 289.0) * 289.0
  );
}

/**
 * 벡터를 섞어서 패턴을 퍼뜨리는 Permutation 함수
 * - GLSL의 permute 함수와 동일
 * @param v THREE.Vector3
 * @returns Vector3(permute된 값)
 */
function permute3(v: THREE.Vector3): THREE.Vector3 {
  return mod3(new THREE.Vector3((v.x * 34.0 + 1.0) * v.x, (v.y * 34.0 + 1.0) * v.y, (v.z * 34.0 + 1.0) * v.z));
}

/**
 * 2D Simplex noise 구현체
 * - GLSL의 snoise(vec2)와 동일
 * - Grass 배치/애니메이션 등에 활용
 * @param v 입력 좌표 (2D)
 * @returns -1.0 ~ +1.0 범위의 노이즈 값
 */
export function simplex2d(v: THREE.Vector2): number {
  const C = new THREE.Vector4(
    0.211324865405187, // (3.0 - sqrt(3.0)) / 6.0
    0.366025403784439, // (sqrt(3.0) - 1.0) / 2.0
    -0.577350269189626, // -1.0 + 2.0 * C.x
    0.024390243902439 // 1.0 / 41.0
  );

  // 격자 셀 결정
  let i = new THREE.Vector2(Math.floor(v.x + C.y * (v.x + v.y)), Math.floor(v.y + C.y * (v.x + v.y)));

  // 셀 내부 오프셋
  const x0 = new THREE.Vector2(v.x - i.x + C.x * (i.x + i.y), v.y - i.y + C.x * (i.x + i.y));

  // 코너 방향 판정
  const i1 = new THREE.Vector2(x0.x > x0.y ? 1.0 : 0.0, x0.x > x0.y ? 0.0 : 1.0);

  // 셀의 나머지 2개의 코너 위치 계산
  const x12 = new THREE.Vector4(x0.x - i1.x + C.x, x0.y - i1.y + C.x, x0.x + C.z, x0.y + C.z);

  // 좌표 mod289 처리
  i = new THREE.Vector2(i.x - Math.floor(i.x * (1.0 / 289.0)) * 289.0, i.y - Math.floor(i.y * (1.0 / 289.0)) * 289.0);

  // 해시용 인덱스 구성 및 permute 적용
  let p = new THREE.Vector3(i.y, i.y + i1.y, i.y + 1.0);
  p = permute3(p);
  p = permute3(new THREE.Vector3(p.x + i.x, p.y + i.x + i1.x, p.z + i.x + 1.0));

  // 거리 기반 가중치 계산 (falloff)
  let m = new THREE.Vector3(
    Math.max(0.0, 0.5 - x0.dot(x0)),
    Math.max(0.0, 0.5 - (x12.x * x12.x + x12.y * x12.y)),
    Math.max(0.0, 0.5 - (x12.z * x12.z + x12.w * x12.w))
  );
  m = new THREE.Vector3(m.x ** 4, m.y ** 4, m.z ** 4);

  // gradient 계산
  const x = new THREE.Vector3(
    2.0 * (p.x * C.w - Math.floor(p.x * C.w)) - 1.0,
    2.0 * (p.y * C.w - Math.floor(p.y * C.w)) - 1.0,
    2.0 * (p.z * C.w - Math.floor(p.z * C.w)) - 1.0
  );
  const h = new THREE.Vector3(Math.abs(x.x) - 0.5, Math.abs(x.y) - 0.5, Math.abs(x.z) - 0.5);
  const ox = new THREE.Vector3(Math.floor(x.x + 0.5), Math.floor(x.y + 0.5), Math.floor(x.z + 0.5));
  const a0 = new THREE.Vector3(x.x - ox.x, x.y - ox.y, x.z - ox.z);

  // 영향력 보정
  m = new THREE.Vector3(
    m.x * (1.79284291400159 - 0.85373472095314 * (a0.x ** 2 + h.x ** 2)),
    m.y * (1.79284291400159 - 0.85373472095314 * (a0.y ** 2 + h.y ** 2)),
    m.z * (1.79284291400159 - 0.85373472095314 * (a0.z ** 2 + h.z ** 2))
  );

  // 최종 노이즈 값 계산
  const g = new THREE.Vector3(a0.x * x0.x + h.x * x0.y, a0.y * x12.x + h.y * x12.y, a0.z * x12.z + h.z * x12.w);

  return 130.0 * m.dot(g);
}
