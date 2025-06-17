import * as THREE from "three";

export class RainSystem {
  public mesh: THREE.Points;
  private positions: Float32Array;
  private count = 10000;
  private width = 1000;
  private height = 500;
  private depth = 1000;
  private fallSpeed = 200;

  constructor() {
    this.positions = new Float32Array(this.count * 3);
    for (let i = 0; i < this.count; i++) {
      this.positions[3 * i] = (Math.random() - 0.5) * this.width;
      this.positions[3 * i + 1] = Math.random() * this.height;
      this.positions[3 * i + 2] = (Math.random() - 0.5) * this.depth;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(this.positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 1,
      transparent: true,
      opacity: 0.6,
    });
    this.mesh = new THREE.Points(geometry, material);
  }

  update(delta: number, camera: THREE.Camera) {
    const pos = (this.mesh.geometry as THREE.BufferGeometry).attributes.position.array as Float32Array;
    for (let i = 0; i < this.count; i++) {
      let y = pos[3 * i + 1] - this.fallSpeed * delta;
      if (y < 0) {
        y = this.height;
        // 카메라 주변으로 XZ 리사이클
        const cam = camera.position;
        pos[3 * i] = cam.x + (Math.random() - 0.5) * this.width;
        pos[3 * i + 2] = cam.z + (Math.random() - 0.5) * this.depth;
      }
      pos[3 * i + 1] = y;
    }
    (this.mesh.geometry as THREE.BufferGeometry).attributes.position.needsUpdate = true;
    // rain은 항상 카메라 주변을 덮도록
    this.mesh.position.set(camera.position.x, 0, camera.position.z);
  }
}
