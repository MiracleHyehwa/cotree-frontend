import { TreeOptions } from "../treeOptions";

import ashSmall from "./ash_small.json" assert { type: "json" };
import ashMedium from "./ash_medium.json" assert { type: "json" };
import ashLarge from "./ash_large.json" assert { type: "json" };
import aspenSmall from "./aspen_small.json" assert { type: "json" };
import aspenMedium from "./aspen_medium.json" assert { type: "json" };
import aspenLarge from "./aspen_large.json" assert { type: "json" };
import bush1 from "./bush_1.json" assert { type: "json" };
import bush2 from "./bush_2.json" assert { type: "json" };
import bush3 from "./bush_3.json" assert { type: "json" };
import oakSmall from "./oak_small.json" assert { type: "json" };
import oakMedium from "./oak_medium.json" assert { type: "json" };
import oakLarge from "./oak_large.json" assert { type: "json" };
import pineSmall from "./pine_small.json" assert { type: "json" };
import pineMedium from "./pine_medium.json" assert { type: "json" };
import pineLarge from "./pine_large.json" assert { type: "json" };

export const TreePreset = {
  AshSmall: ashSmall,
  AshMedium: ashMedium,
  AshLarge: ashLarge,
  AspenSmall: aspenSmall,
  AspenMedium: aspenMedium,
  AspenLarge: aspenLarge,
  Bush1: bush1,
  Bush2: bush2,
  Bush3: bush3,
  OakSmall: oakSmall,
  OakMedium: oakMedium,
  OakLarge: oakLarge,
  PineSmall: pineSmall,
  PineMedium: pineMedium,
  PineLarge: pineLarge,
} as const;

// 프리셋 이름 타입
export type TreePresetName = keyof typeof TreePreset;

/**
 * 이름에 해당하는 트리 프리셋을 로드합니다.
 *
 * @param name 사용할 프리셋 이름 (예: "OakSmall")
 * @returns TreeOptions 형태의 프리셋 설정 객체
 */
export function loadPreset(name: TreePresetName): TreeOptions {
  const presetData = TreePreset[name];
  const options = new TreeOptions();
  if (presetData) {
    options.copy(structuredClone(presetData) as Partial<TreeOptions>);
  }
  return options;
}
