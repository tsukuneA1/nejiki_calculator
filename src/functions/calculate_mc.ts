import { typeReduceHalf } from "@/constants/items";
import type { Attacker } from "@/types/attacker";
import type { Defender } from "@/types/defender";

export const calculateMC = (
  attacker: Attacker,
  defender: Defender,
  compatibility: number,
) => {
  let mc = 1;
  if (compatibility === 0.5 && attacker.ability === "いろめがね") {
    mc *= 2;
  }
  if (compatibility >= 2) {
    if (attacker.item === "たつじんのおび") {
      mc *= 1.2;
    }

    if (["ハードロック", "フィルター"].includes(defender.ability!)) {
      mc *= 0.75;
    }
  }
  if (attacker.item === "半減の実") {
    mc *= 0.5;
  }

  mc *= typeReduceHalf({
    type: attacker.move?.type,
    item: defender.item!,
  });

  return mc;
};
