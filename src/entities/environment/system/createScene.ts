import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Tree } from "@/entities/environment/tree";
import { TreePreset, TreePresetName } from "@/entities/environment/tree/presets";
import { Environment } from "@/entities/environment/system";

interface CreateSceneResult {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  baseTree: Tree;
  environment: Environment;
  forest: THREE.Group;
}

export async function createScene(container: HTMLDivElement, exp: number): Promise<CreateSceneResult> {
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x94b9f8, 0.0015);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(0);
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 2;
  container.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.set(100, 20, 0);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = true;
  controls.minPolarAngle = Math.PI / 2 - 0.2;
  controls.maxPolarAngle = Math.PI / 2 + 0.13;
  controls.minDistance = 10;
  controls.maxDistance = 150;
  controls.target.set(0, 25, 0);
  controls.update();

  const grassAmount = calculateGrassAmount(exp);
  const environment = new Environment(grassAmount);
  scene.add(environment);

  await environment.whenReady();

  const baseTree = new Tree();
  baseTree.generate();
  baseTree.queueGrowthFromExp(exp);
  baseTree.position.set(0, 0, 0);
  scene.add(baseTree);

  const forest = generateForest();
  scene.add(forest);

  return {
    scene,
    camera,
    renderer,
    controls,
    baseTree,
    environment,
    forest,
  };
}

function calculateGrassAmount(exp: number): number {
  const maxGrass = 20000;
  const maxExp = 10000;
  const ratio = Math.min(exp / maxExp, 1);
  const curvedRatio = Math.pow(ratio, 0.8);
  return Math.floor(500 + (maxGrass - 500) * curvedRatio);
}

function generateForest(): THREE.Group {
  const forest = new THREE.Group();
  const treeCount = 80;
  const minDistance = 175;
  const maxDistance = 500;
  const presets = Object.keys(TreePreset) as TreePresetName[];

  const presetCache = new Map<TreePresetName, Tree>();

  for (let i = 0; i < treeCount; i++) {
    const r = minDistance + Math.random() * maxDistance;
    const theta = 2 * Math.PI * Math.random();
    const preset = presets[Math.floor(Math.random() * presets.length)];

    let template = presetCache.get(preset);
    if (!template) {
      template = new Tree();
      template.loadPreset(preset);
      template.generate();
      presetCache.set(preset, template);
    }

    const clone = template.clone() as Tree;
    clone.position.set(r * Math.cos(theta), 0, r * Math.sin(theta));
    clone.castShadow = false;
    clone.receiveShadow = false;
    forest.add(clone);
  }

  return forest;
}
