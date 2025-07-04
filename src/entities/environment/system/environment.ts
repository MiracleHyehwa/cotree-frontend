import * as THREE from "three";
import { Grass } from "@/entities/environment/grass";
import { Clouds } from "@/entities/environment/clouds";
import { Skybox } from "@/entities/environment/skyBox";
import { Ground } from "@/entities/environment/ground";
import { Rocks } from "@/entities/environment/rocks";
import { RainSystem } from "@/entities/environment/rain";

export class Environment extends THREE.Object3D {
  private grass: Grass;
  private clouds: Clouds;
  private ground: Ground;
  private rocks: Rocks;
  private skybox: Skybox;
  private rain: RainSystem;
  private raining = false;

  private readyPromise: Promise<void>;

  constructor(grassAmount: number) {
    super();

    this.ground = new Ground();
    this.add(this.ground);

    this.grass = new Grass();
    const grassReady = this.grass.whenReady().then(() => {
      this.grass.generateGrass(grassAmount);
      this.add(this.grass);
    });

    this.rocks = new Rocks();
    this.add(this.rocks);

    this.skybox = new Skybox();
    this.add(this.skybox);

    this.clouds = new Clouds();
    this.clouds.position.set(0, 200, 0);
    this.clouds.rotation.x = Math.PI / 2;
    this.add(this.clouds);

    this.rain = new RainSystem();
    this.rain.mesh.visible = false;
    this.add(this.rain.mesh);

    this.readyPromise = grassReady;
  }

  public async whenReady(): Promise<void> {
    await this.readyPromise;
  }

  update(elapsedTime: number, camera: THREE.Camera) {
    this.grass.update(elapsedTime);
    this.clouds.update(elapsedTime);
    if (this.raining) {
      this.rain.update(elapsedTime, camera);
    }
  }

  setGrassAmount(amount: number) {
    this.grass.setGrassAmount(amount);
  }

  getGrass() {
    return this.grass;
  }

  public startRain() {
    this.raining = true;
    this.rain.mesh.visible = true;
  }
  public stopRain() {
    this.raining = false;
    this.rain.mesh.visible = false;
  }
}
