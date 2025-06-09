import * as THREE from "three";
import { RNG } from "./rng";
import { TreeOptions } from "./treeOptions";
import { Branch } from "./branch";
import { loadPreset, TreePresetName } from "./presets";
import { Billboard } from "./enums";
import { getBarkTexture, getLeafTexture } from "./textures";

type WindShaderMaterial = THREE.Material & {
  userData: {
    shader?: {
      uniforms: {
        uTime: { value: number };
      };
    };
  };
};

function isWindShaderMaterial(material: THREE.Material): material is WindShaderMaterial {
  return (
    material.userData &&
    material.userData.shader !== undefined &&
    typeof material.userData.shader.uniforms?.uTime?.value === "number"
  );
}

/**
 * Tree 클래스는 3D 공간에서 나무(트리)를 생성하고 관리하는 클래스입니다.
 * 브랜치와 잎을 구성하고, 설정된 옵션과 시드를 기반으로 Procedural Tree를 생성합니다.
 */
export class Tree extends THREE.Group {
  private targetScale = 1;
  private currentScale = 1;

  private branches: {
    verts: number[];
    normals: number[];
    indices: number[];
    uvs: number[];
    windFactor: number[];
  } = {
    verts: [],
    normals: [],
    indices: [],
    uvs: [],
    windFactor: [],
  };

  private leaves: {
    verts: number[];
    normals: number[];
    indices: number[];
    uvs: number[];
  } = {
    verts: [],
    normals: [],
    indices: [],
    uvs: [],
  };
  /** 시드 기반 난수 생성기 */
  private rng: RNG;

  /** 트리 설정값 (옵션) */
  private options: TreeOptions;

  /** 트리 생성을 위한 브랜치 처리 큐 */
  private branchQueue: Branch[] = [];

  /** 생성된 브랜치 메시 */
  private branchesMesh: THREE.Mesh;

  /** 생성된 잎 메시 */
  private leavesMesh: THREE.Mesh;

  /**
   * 새로운 Tree 객체를 생성합니다.
   * @param options TreeOptions 인스턴스 (설정 값), 기본값은 새로운 TreeOptions()
   */
  constructor(options: TreeOptions = new TreeOptions()) {
    super();
    this.name = "Tree";
    this.options = options;
    this.rng = new RNG(this.options.seed);

    this.branchesMesh = new THREE.Mesh();
    this.leavesMesh = new THREE.Mesh();

    this.add(this.branchesMesh);
    this.add(this.leavesMesh);
  }

  /**
   * 나무의 애니메이션 상태를 업데이트합니다.
   *
   * 이 메서드는 잎 메시(`leavesMesh`)에 적용된 커스텀 쉐이더의 `uTime` uniform 값을
   * 전달받은 `elapsedTime`으로 갱신하여, 시간 기반의 애니메이션 효과
   * (예: 바람에 흔들리는 잎사귀)를 구현합니다.
   *
   * @param elapsedTime THREE.Clock 등에서 얻은 경과 시간 (초 단위)
   */
  public update(elapsedTime: number): void {
    const material = this.leavesMesh.material as THREE.Material;

    if (isWindShaderMaterial(material)) {
      material.userData.shader!.uniforms.uTime.value = elapsedTime;
    }

    this.currentScale = THREE.MathUtils.lerp(this.currentScale, this.targetScale, 0.15);
    this.scale.set(this.currentScale, this.currentScale, this.currentScale);
  }

  /**
   * 주어진 이름의 프리셋을 로드하여 트리 설정을 적용합니다.
   *
   * @param name 프리셋 이름 (예: "OakSmall", "PineMedium" 등)
   */
  public loadPreset(name: TreePresetName): void {
    const json = loadPreset(name);
    this.loadFromJson(json);
  }
  /**
   * JSON 데이터를 기반으로 트리 옵션을 로드하고 트리를 재생성합니다.
   *
   * @param json TreeOptions 일부 또는 전체 설정 객체
   */
  public loadFromJson(json: Partial<TreeOptions>): void {
    this.options.copy(json);
    this.generate();
  }

  /**
   * 현재 설정값(TreeOptions)에 따라 새로운 나무를 생성합니다.
   *
   * - 기존 메시, 지오메트리, 버텍스 데이터를 모두 초기화합니다.
   * - 설정된 시드(seed) 기반으로 난수 생성기를 초기화합니다.
   * - 루트 브랜치를 시작점으로 큐(queue)를 순회하며 트리를 재귀적으로 구성합니다.
   * - 모든 브랜치가 생성된 후, 가지와 잎의 지오메트리를 각각 생성합니다.
   *
   * 주의: 이 메서드는 트리의 시각적 구조를 완전히 재구성하므로
   * 트리의 형태에 영향을 주는 속성이 변경된 경우 반드시 호출되어야 합니다.
   */
  public generate(): void {
    this.branches = {
      verts: [],
      normals: [],
      indices: [],
      uvs: [],
      windFactor: [],
    };

    this.leaves = {
      verts: [],
      normals: [],
      indices: [],
      uvs: [],
    };

    this.rng = new RNG(this.options.seed);

    this.branchQueue = [];
    this.branchQueue.push(
      new Branch(
        new THREE.Vector3(),
        new THREE.Euler(),
        this.options.branch.length[0],
        this.options.branch.radius[0],
        0,
        this.options.branch.sections[0],
        this.options.branch.segments[0]
      )
    );

    while (this.branchQueue.length > 0) {
      const branch = this.branchQueue.shift();
      if (branch) this.generateBranch(branch);
    }

    this.createBranchesGeometry();
    this.createLeavesGeometry();
  }

  /**
   * 지정된 브랜치 객체를 기반으로 트리의 한 가지(branch)를 생성합니다.
   * 이 메서드는 다음과 같은 작업을 수행합니다:
   *
   * 1. 브랜치의 각 섹션마다 정점(verts), 노멀(normals), UV 좌표를 생성하여 지오메트리 데이터를 누적합니다.
   * 2. 섹션별로 가지 방향을 틀고(twist), 성장 방향을 반영한 Quaternion을 적용합니다.
   * 3. 브랜치의 끝에서 자식 브랜치를 추가하거나 잎을 생성합니다.
   * 4. 브랜치 메시의 인덱스를 생성합니다 (`generateBranchIndices` 호출).
   * 5. 브랜치의 마지막 섹션에서 잎(`generateLeaves`) 또는 자식 브랜치(`generateChildBranches`)를 생성합니다.
   *
   * @param branch 브랜치의 시작 위치, 방향, 길이, 반지름, 단계(level) 등의 정보를 포함한 Branch 객체
   */

  private generateBranch(branch: Branch): void {
    // 현재 브랜치 시작 정점 인덱스 (인덱스 오프셋 계산용)
    const indexOffset = this.branches.verts.length / 3;

    const sectionOrientation = branch.orientation.clone();
    const sectionOrigin = branch.origin.clone();

    // 섹션 하나의 길이 계산
    const sectionLength =
      branch.length / branch.sectionCount / (this.options.type === "deciduous" ? this.options.branch.levels - 1 : 1);

    // 이후 잎 또는 자식 브랜치 생성을 위한 섹션 정보 저장
    const sections: {
      origin: THREE.Vector3;
      orientation: THREE.Euler;
      radius: number;
    }[] = [];

    for (let i = 0; i <= branch.sectionCount; i++) {
      let sectionRadius = branch.radius;

      if (i === branch.sectionCount && branch.level === this.options.branch.levels) {
        sectionRadius = 0.001; // 최상위 브랜치는 거의 0에 가까운 두께
      } else if (this.options.type === "deciduous") {
        sectionRadius *= 1 - this.options.branch.taper[branch.level] * (i / branch.sectionCount);
      }

      let firstVertexData: {
        vertex: THREE.Vector3;
        normal: THREE.Vector3;
        uv: THREE.Vector2;
      } | null = null;

      // 원형 단면 정점 생성
      for (let j = 0; j < branch.segmentCount; j++) {
        const angle = (2 * Math.PI * j) / branch.segmentCount;

        const vertex = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle))
          .multiplyScalar(sectionRadius)
          .applyEuler(sectionOrientation)
          .add(sectionOrigin);

        const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle))
          .applyEuler(sectionOrientation)
          .normalize();

        const uv = new THREE.Vector2(j / branch.segmentCount, i % 2 === 0 ? 0 : 1);

        this.branches.verts.push(...vertex.toArray());
        this.branches.normals.push(...normal.toArray());
        this.branches.uvs.push(uv.x, uv.y);

        if (j === 0) {
          firstVertexData = { vertex, normal, uv };
        }
      }

      // UV 연속성을 위한 첫 정점 복제
      if (firstVertexData) {
        this.branches.verts.push(...firstVertexData.vertex.toArray());
        this.branches.normals.push(...firstVertexData.normal.toArray());
        this.branches.uvs.push(1, firstVertexData.uv.y);
      }

      sections.push({
        origin: sectionOrigin.clone(),
        orientation: sectionOrientation.clone(),
        radius: sectionRadius,
      });

      // 다음 섹션 위치로 이동
      sectionOrigin.add(new THREE.Vector3(0, sectionLength, 0).applyEuler(sectionOrientation));

      // 가지의 휘어짐(gnarliness) 정도 적용
      const gnarliness = Math.max(1, 1 / Math.sqrt(sectionRadius)) * this.options.branch.gnarliness[branch.level];

      sectionOrientation.x += this.rng.random(-gnarliness, gnarliness);
      sectionOrientation.z += this.rng.random(-gnarliness, gnarliness);

      // 성장 방향과 트위스트 적용 (Quaternion)
      const qSection = new THREE.Quaternion().setFromEuler(sectionOrientation);
      const qTwist = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        this.options.branch.twist[branch.level]
      );

      const qForce = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3().copy(this.options.branch.force.direction)
      );

      qSection.multiply(qTwist);
      qSection.rotateTowards(qForce, this.options.branch.force.strength / sectionRadius);

      sectionOrientation.setFromQuaternion(qSection);
    }

    // 브랜치 메시 인덱스 생성
    this.generateBranchIndices(indexOffset, branch);

    const lastSection = sections[sections.length - 1];

    if (this.options.type === "deciduous") {
      // 다음 레벨 브랜치 또는 잎
      if (branch.level < this.options.branch.levels) {
        this.branchQueue.push(
          new Branch(
            lastSection.origin,
            lastSection.orientation,
            this.options.branch.length[branch.level + 1],
            lastSection.radius,
            branch.level + 1,
            branch.sectionCount,
            branch.segmentCount
          )
        );
      } else {
        this.generateLeaf(lastSection.origin, lastSection.orientation);
      }
    }

    if (branch.level === this.options.branch.levels) {
      this.generateLeaves(sections);
    } else if (branch.level < this.options.branch.levels) {
      this.generateChildBranches(this.options.branch.children[branch.level], branch.level + 1, sections);
    }
  }

  /**
   * 부모 브랜치의 섹션들을 기준으로 자식 브랜치들을 생성합니다.
   *
   * @param count 자식 브랜치의 개수
   * @param level 현재 자식 브랜치의 단계 (1, 2, 3...)
   * @param sections 부모 브랜치의 섹션 배열
   */
  private generateChildBranches(
    count: number,
    level: number,
    sections: {
      origin: THREE.Vector3;
      orientation: THREE.Euler;
      radius: number;
    }[]
  ): void {
    const radialOffset = this.rng.random();

    for (let i = 0; i < count; i++) {
      // 자식 브랜치가 어느 위치에서 시작될지를 결정 (0~1)
      const childBranchStart = this.rng.random(1.0, this.options.branch.start[level]);

      // 인덱스로 섹션 두 개를 찾아 interpolation
      const sectionIndex = Math.floor(childBranchStart * (sections.length - 1));
      const sectionA = sections[sectionIndex];
      const sectionB = sectionIndex === sections.length - 1 ? sectionA : sections[sectionIndex + 1];

      const alpha = (childBranchStart - sectionIndex / (sections.length - 1)) / (1 / (sections.length - 1));

      const childBranchOrigin = new THREE.Vector3().lerpVectors(sectionA.origin, sectionB.origin, alpha);

      const childBranchRadius =
        this.options.branch.radius[level] * ((1 - alpha) * sectionA.radius + alpha * sectionB.radius);

      const qA = new THREE.Quaternion().setFromEuler(sectionA.orientation);
      const qB = new THREE.Quaternion().setFromEuler(sectionB.orientation);
      const parentOrientation = new THREE.Euler().setFromQuaternion(qB.slerp(qA, alpha));

      const radialAngle = 2.0 * Math.PI * (radialOffset + i / count);

      const q1 = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(1, 0, 0),
        this.options.branch.angle[level] * (Math.PI / 180)
      );
      const q2 = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), radialAngle);
      const q3 = new THREE.Quaternion().setFromEuler(parentOrientation);

      const childBranchOrientation = new THREE.Euler().setFromQuaternion(q3.multiply(q2.multiply(q1)));
      const childBranchLength = this.options.branch.length[level];

      this.branchQueue.push(
        new Branch(
          childBranchOrigin,
          childBranchOrientation,
          childBranchLength,
          childBranchRadius,
          level,
          this.options.branch.sections[level],
          this.options.branch.segments[level]
        )
      );
    }
  }

  /**
   * 부모 브랜치의 각 섹션을 기반으로 잎(leaf)을 생성합니다.
   *
   * 이 메서드는 다음과 같은 과정을 통해 잎을 배치합니다:
   *
   * 1. 랜덤한 비율(`leafStart`)을 기준으로 부모 브랜치의 위치를 보간합니다.
   * 2. 해당 위치를 기준으로 `origin`과 `orientation`을 보간하여 잎이 자랄 위치와 방향을 계산합니다.
   * 3. 보간된 위치에서 radial offset과 각도(angle)를 적용하여 최종 방향을 설정합니다.
   * 4. `generateLeaf()` 메서드를 통해 실제 잎 메시를 생성합니다.
   *
   * @param {{
   *  origin: THREE.Vector3,
   *  orientation: THREE.Euler,
   *  radius: number
   * }[]} sections 부모 브랜치의 각 섹션 데이터 배열. 잎 생성 위치 보간에 사용됩니다.
   */
  generateLeaves(
    sections: {
      origin: THREE.Vector3;
      orientation: THREE.Euler;
      radius: number;
    }[]
  ): void {
    const radialOffset = this.rng.random();

    for (let i = 0; i < this.options.leaves.count; i++) {
      const leafStart = this.rng.random(1.0, this.options.leaves.start);

      const sectionIndex = Math.floor(leafStart * (sections.length - 1));
      const sectionA = sections[sectionIndex];
      const sectionB = sectionIndex === sections.length - 1 ? sectionA : sections[sectionIndex + 1];

      const alpha = (leafStart - sectionIndex / (sections.length - 1)) / (1 / (sections.length - 1));

      const leafOrigin = new THREE.Vector3().lerpVectors(sectionA.origin, sectionB.origin, alpha);

      const qA = new THREE.Quaternion().setFromEuler(sectionA.orientation);
      const qB = new THREE.Quaternion().setFromEuler(sectionB.orientation);
      const parentOrientation = new THREE.Euler().setFromQuaternion(qB.slerp(qA, alpha));

      const radialAngle = 2.0 * Math.PI * (radialOffset + i / this.options.leaves.count);
      const q1 = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(1, 0, 0),
        this.options.leaves.angle / (180 / Math.PI)
      );
      const q2 = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), radialAngle);
      const q3 = new THREE.Quaternion().setFromEuler(parentOrientation);

      const leafOrientation = new THREE.Euler().setFromQuaternion(q3.multiply(q2.multiply(q1)));

      this.generateLeaf(leafOrigin, leafOrientation);
    }
  }

  /**
   * 단일 잎(leaf)을 생성하여 `leaves` 버퍼에 데이터를 추가합니다.
   *
   * 잎은 사각형(quad) 형태로 만들어지며, 지정된 위치와 방향으로 회전 변환됩니다.
   * `Billboard.Double` 옵션이 활성화된 경우, 90도 회전된 잎을 하나 더 추가하여 더 풍성하게 표현됩니다.
   *
   * @param {THREE.Vector3} origin - 잎이 생성될 시작 위치
   * @param {THREE.Euler} orientation - 잎의 방향 (브랜치의 방향에 따라 회전 적용됨)
   */
  generateLeaf(origin: THREE.Vector3, orientation: THREE.Euler): void {
    let i = this.leaves.verts.length / 3;

    const leafSize =
      this.options.leaves.size *
      (1 + this.rng.random(this.options.leaves.sizeVariance, -this.options.leaves.sizeVariance));

    const W = leafSize;
    const L = leafSize;

    const createLeaf = (rotation: number) => {
      const quadVerts = [
        new THREE.Vector3(-W / 2, L, 0),
        new THREE.Vector3(-W / 2, 0, 0),
        new THREE.Vector3(W / 2, 0, 0),
        new THREE.Vector3(W / 2, L, 0),
      ].map((v) =>
        v
          .applyEuler(new THREE.Euler(0, rotation, 0)) // 내부 회전
          .applyEuler(orientation) // 외부 회전
          .add(origin)
      );

      // 정점
      this.leaves.verts.push(
        quadVerts[0].x,
        quadVerts[0].y,
        quadVerts[0].z,
        quadVerts[1].x,
        quadVerts[1].y,
        quadVerts[1].z,
        quadVerts[2].x,
        quadVerts[2].y,
        quadVerts[2].z,
        quadVerts[3].x,
        quadVerts[3].y,
        quadVerts[3].z
      );

      // 노멀 (Z 방향, orientation 반영)
      const n = new THREE.Vector3(0, 0, 1).applyEuler(orientation);
      this.leaves.normals.push(n.x, n.y, n.z, n.x, n.y, n.z, n.x, n.y, n.z, n.x, n.y, n.z);

      // UV 좌표
      this.leaves.uvs.push(0, 1, 0, 0, 1, 0, 1, 1);

      // 인덱스 (삼각형 2개로 quad 구성)
      this.leaves.indices.push(i, i + 1, i + 2, i, i + 2, i + 3);
      i += 4;
    };

    createLeaf(0);
    if (this.options.leaves.billboard === Billboard.Double) {
      createLeaf(Math.PI / 2); // 90도 회전된 잎 추가
    }
  }

  /**
   * 브랜치(가지)의 인덱스 데이터를 생성하여 `branches.indices`에 추가합니다.
   *
   * 각 섹션은 원형 단면(segments)으로 구성되며, 인접한 섹션 간의 정점을 연결해
   * 원통형 메시를 구성합니다. 끝단은 막지 않고 중간 표면만 생성됩니다.
   *
   * @param {number} indexOffset - 현재 브랜치의 정점 시작 인덱스 (글로벌 인덱스 기준)
   * @param {Branch} branch - 섹션 수와 세그먼트 수 정보를 포함한 브랜치 객체
   */
  generateBranchIndices(indexOffset: number, branch: Branch): void {
    const segmentPerSection = branch.segmentCount + 1;

    for (let i = 0; i < branch.sectionCount; i++) {
      for (let j = 0; j < branch.segmentCount; j++) {
        const v1 = indexOffset + i * segmentPerSection + j;
        const v2 = indexOffset + i * segmentPerSection + (j + 1);
        const v3 = v1 + segmentPerSection;
        const v4 = v2 + segmentPerSection;

        // 삼각형 2개로 사각형 면을 구성
        this.branches.indices.push(v1, v3, v2); // 첫 번째 삼각형
        this.branches.indices.push(v2, v3, v4); // 두 번째 삼각형
      }
    }
  }

  /**
   * 누적된 브랜치의 정점 데이터를 기반으로 `BufferGeometry`를 생성하고
   * 텍스처와 재질 정보를 반영하여 브랜치 메시(`branchesMesh`)에 적용합니다.
   *
   * - `branches.verts`, `normals`, `uvs`, `indices` 데이터를 사용하여 geometry 구성
   * - 나무 껍질 텍스처(`bark`) 설정에 따라 텍스처를 동적으로 로드
   * - 기존 geometry/material 리소스는 안전하게 dispose 처리
   */
  createBranchesGeometry(): void {
    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(this.branches.verts), 3));
    geometry.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(this.branches.normals), 3));
    geometry.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(this.branches.uvs), 2));
    geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(this.branches.indices), 1));
    geometry.computeBoundingSphere();

    const material = new THREE.MeshStandardMaterial({
      name: "branches",
      flatShading: this.options.bark.flatShading,
      color: new THREE.Color(this.options.bark.tint),
    });

    if (this.options.bark.textured) {
      const scale = this.options.bark.textureScale;
      const barkType = this.options.bark.type;

      material.aoMap = getBarkTexture(barkType, "ao", scale);
      material.map = getBarkTexture(barkType, "color", scale);
      material.normalMap = getBarkTexture(barkType, "normal", scale);
      material.roughnessMap = getBarkTexture(barkType, "roughness", scale);
    }

    // 기존 리소스 안전하게 정리 후 교체
    this.branchesMesh.geometry.dispose();
    this.branchesMesh.geometry = geometry;

    if (Array.isArray(this.branchesMesh.material)) {
      this.branchesMesh.material.forEach((m) => m.dispose());
    } else {
      this.branchesMesh.material.dispose();
    }

    this.branchesMesh.material = material;

    this.branchesMesh.castShadow = true;
    this.branchesMesh.receiveShadow = true;
  }

  /**
   * 누적된 잎사귀 데이터를 기반으로 `BufferGeometry`를 생성하고,
   * 바람에 흔들리는 커스텀 쉐이더를 적용한 머티리얼을 사용하여 잎 메시(`leavesMesh`)에 적용합니다.
   *
   * - `verts`, `uvs`, `indices`를 바탕으로 `BufferGeometry` 구성
   * - `MeshPhongMaterial`을 기반으로 텍스처, 컬러, 알파 테스트 등 설정
   * - GLSL `simplex noise` 기반 커스텀 바람 흔들림 쉐이더 주입
   * - 기존 리소스 안전하게 dispose 처리
   */
  createLeavesGeometry(): void {
    const leafType = this.options.leaves.type;
    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(this.leaves.verts), 3));
    geometry.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(this.leaves.uvs), 2));
    geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(this.leaves.indices), 1));
    geometry.computeVertexNormals();
    geometry.computeBoundingSphere();

    const material = new THREE.MeshPhongMaterial({
      name: "leaves",
      map: getLeafTexture(leafType),
      color: new THREE.Color(this.options.leaves.tint),
      side: THREE.DoubleSide,
      alphaTest: this.options.leaves.alphaTest,
      dithering: true,
    });

    // 바람에 의한 흔들림 커스텀 쉐이더 삽입
    material.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      shader.uniforms.uWindStrength = { value: new THREE.Vector3(0.5, 0, 0.5) };
      shader.uniforms.uWindFrequency = { value: 0.5 };
      shader.uniforms.uWindScale = { value: 70 };

      // Uniform 정의 삽입
      shader.vertexShader =
        `
      uniform float uTime;
      uniform vec3 uWindStrength;
      uniform float uWindFrequency;
      uniform float uWindScale;
    ` + shader.vertexShader;

      // main() 앞에 simplex noise 삽입
      shader.vertexShader = shader.vertexShader.replace(
        `void main() {`,
        `
            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
            vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
            vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

            float simplex3(vec3 v) {
            const vec2 C = vec2(1.0/6.0, 1.0/3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

            vec3 i  = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;
            i = mod289(i);
            vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            float n_ = 0.142857142857;
            vec3 ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_);
            vec4 x = x_ * ns.x + ns.yyyy;
            vec4 y = y_ * ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);
            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
            vec3 g0 = vec3(a0.xy, h.x);
            vec3 g1 = vec3(a0.zw, h.y);
            vec3 g2 = vec3(a1.xy, h.z);
            vec3 g3 = vec3(a1.zw, h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(g0,g0), dot(g1,g1), dot(g2,g2), dot(g3,g3)));
            g0 *= norm.x;
            g1 *= norm.y;
            g2 *= norm.z;
            g3 *= norm.w;
            vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            m = m * m;
            return 42.0 * dot(m*m, vec4(dot(g0,x0), dot(g1,x1), dot(g2,x2), dot(g3,x3)));
        }

        void main() {
        `
      );

      // 흔들림 로직 주입
      shader.vertexShader = shader.vertexShader.replace(
        `#include <project_vertex>`,
        `
            vec4 mvPosition = vec4(transformed, 1.0);
            float windOffset = 2.0 * 3.14 * simplex3(mvPosition.xyz / uWindScale);
            vec3 windSway = uv.y * uWindStrength * (
            0.5 * sin(uTime * uWindFrequency + windOffset) +
            0.3 * sin(2.0 * uTime * uWindFrequency + 1.3 * windOffset) +
            0.2 * sin(5.0 * uTime * uWindFrequency + 1.5 * windOffset)
            );
            mvPosition.xyz += windSway;
            mvPosition = modelViewMatrix * mvPosition;
            gl_Position = projectionMatrix * mvPosition;
        `
      );

      material.userData.shader = shader;
    };

    // 기존 리소스 정리 및 적용
    this.leavesMesh.geometry.dispose();
    this.leavesMesh.geometry = geometry;

    if (Array.isArray(this.leavesMesh.material)) {
      this.leavesMesh.material.forEach((m) => m.dispose());
    } else {
      this.leavesMesh.material.dispose();
    }

    this.leavesMesh.material = material;

    this.leavesMesh.castShadow = true;
    this.leavesMesh.receiveShadow = true;
  }

  /**
   * 경험치를 기반으로 성장 비율(0~1)을 계산
   * - 레벨 구조: 1000exp 당 1레벨
   * - 최대 레벨: 10
   * - 반환값은 0.0~1.0 사이의 절대 성장 비율
   * @param exp 현재 누적 경험치
   * @returns 0 ~ 1 사이의 성장 비율
   */

  private computeGrowthRatioFromExp(exp: number): number {
    const maxLevel = 10;
    const expPerLevel = 1000;
    const level = Math.floor(exp / expPerLevel) + 1;
    const levelRatio = (exp % expPerLevel) / expPerLevel;

    const absoluteRatio = (level - 1 + levelRatio) / (maxLevel - 1);
    return Math.min(absoluteRatio, 1); // 최대값 제한
  }

  /**
   * 주어진 경험치에 따라 성장 비율을 계산하고
   * - 나무의 가지 길이, 잎 크기, 스케일(targetScale)을 업데이트
   * @param exp 현재 누적 경험치
   */

  public queueGrowthFromExp(exp: number): void {
    const ratio = this.computeGrowthRatioFromExp(exp);
    this.applyGrowthRatio(ratio);

    this.targetScale = THREE.MathUtils.lerp(0.8, 1.4, ratio);
  }

  /**
   * 비율(0~1)에 따라 나무의 형태적 속성을 반영
   * - 가지 길이 3종 (baseLength → maxLength)
   * - 잎의 크기 (baseLeafSize → maxLeafSize)
   * @param ratio 성장 비율 (0.0 ~ 1.0)
   */

  private applyGrowthRatio(ratio: number): void {
    const baseLengths = [30, 20, 10];
    const maxLengths = [80, 40, 25];

    for (let i = 0; i < 3; i++) {
      this.options.branch.length[i] = THREE.MathUtils.lerp(baseLengths[i], maxLengths[i], ratio);
    }

    const baseLeafSize = 0.4;
    const maxLeafSize = 9.0;
    this.options.leaves.size = THREE.MathUtils.lerp(baseLeafSize, maxLeafSize, ratio);

    this.generate();
  }

  public getBranchGeometry() {
    return this.branchesMesh.geometry;
  }

  public getLeafGeometry() {
    return this.leavesMesh.geometry;
  }
}
