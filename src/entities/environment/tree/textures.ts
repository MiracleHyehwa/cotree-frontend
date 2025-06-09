import * as THREE from "three";

// --- Bark 텍스처 임포트 ---
import birchAo from "./assets/bark/birch_ao_1k.jpg";
import birchColor from "./assets/bark/birch_color_1k.jpg";
import birchNormal from "./assets/bark/birch_normal_1k.jpg";
import birchRoughness from "./assets/bark/birch_roughness_1k.jpg";

import oakAo from "./assets/bark/oak_ao_1k.jpg";
import oakColor from "./assets/bark/oak_color_1k.jpg";
import oakNormal from "./assets/bark/oak_normal_1k.jpg";
import oakRoughness from "./assets/bark/oak_roughness_1k.jpg";

import pineAo from "./assets/bark/pine_ao_1k.jpg";
import pineColor from "./assets/bark/pine_color_1k.jpg";
import pineNormal from "./assets/bark/pine_normal_1k.jpg";
import pineRoughness from "./assets/bark/pine_roughness_1k.jpg";

import willowAo from "./assets/bark/willow_ao_1k.jpg";
import willowColor from "./assets/bark/willow_color_1k.jpg";
import willowNormal from "./assets/bark/willow_normal_1k.jpg";
import willowRoughness from "./assets/bark/willow_roughness_1k.jpg";

// --- Leaf 텍스처 임포트 ---
import ashLeaves from "./assets/leaves/ash_color.png";
import aspenLeaves from "./assets/leaves/aspen_color.png";
import oakLeaves from "./assets/leaves/oak_color.png";
import pineLeaves from "./assets/leaves/pine_color.png";

import type { BarkType, LeafType } from "./enums";

const textureLoader = new THREE.TextureLoader();

/**
 * 텍스처를 로드하고 설정을 적용합니다.
 * @param url 이미지 경로
 * @param srgb SRGB 색공간 여부 (기본값: true)
 * @returns THREE.Texture 객체
 */
const loadTexture = (url: string, srgb = true): THREE.Texture => {
  const texture = textureLoader.load(url);

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1); // 기본값으로 세팅
  texture.premultiplyAlpha = true;

  if (srgb) {
    texture.colorSpace = THREE.SRGBColorSpace;
  }

  return texture;
};

/**
 * 내부 텍스처 맵 객체
 */
const textures = {
  bark: {
    birch: {
      ao: loadTexture(birchAo, false),
      color: loadTexture(birchColor),
      normal: loadTexture(birchNormal, false),
      roughness: loadTexture(birchRoughness, false),
    },
    oak: {
      ao: loadTexture(oakAo, false),
      color: loadTexture(oakColor),
      normal: loadTexture(oakNormal, false),
      roughness: loadTexture(oakRoughness, false),
    },
    pine: {
      ao: loadTexture(pineAo, false),
      color: loadTexture(pineColor),
      normal: loadTexture(pineNormal, false),
      roughness: loadTexture(pineRoughness, false),
    },
    willow: {
      ao: loadTexture(willowAo, false),
      color: loadTexture(willowColor),
      normal: loadTexture(willowNormal, false),
      roughness: loadTexture(willowRoughness, false),
    },
  },
  leaves: {
    ash: loadTexture(ashLeaves),
    aspen: loadTexture(aspenLeaves),
    oak: loadTexture(oakLeaves),
    pine: loadTexture(pineLeaves),
  },
} as const;

/**
 * 나무 껍질 텍스처를 반환합니다.
 *
 * @param barkType 나무 껍질 타입 (`"oak"`, `"birch"`, `"pine"`, `"willow"`)
 * @param type 텍스처 종류 (`"ao"`, `"color"`, `"normal"`, `"roughness"`)
 * @param scale 반복 스케일 (기본값: `{ x: 1, y: 1 }`)
 * @returns THREE.Texture 객체
 */
export function getBarkTexture(
  barkType: BarkType,
  type: "ao" | "color" | "normal" | "roughness",
  scale: { x: number; y: number } = { x: 1, y: 1 }
): THREE.Texture {
  const texture = textures.bark[barkType][type];
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(scale.x, 1 / scale.y);
  return texture;
}

/**
 * 나뭇잎 텍스처를 반환합니다.
 *
 * @param leafType 잎 타입 (`"oak"`, `"pine"`, `"ash"`, `"aspen"`)
 * @returns THREE.Texture 객체
 */
export function getLeafTexture(leafType: LeafType): THREE.Texture {
  return textures.leaves[leafType];
}
