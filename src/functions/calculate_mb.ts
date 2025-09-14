import type { Attacker } from "@/types/attacker";
import type { Defender } from "@/types/defender";

export const calculateMB = (
  attacker: Attacker,
  defender: Defender,
  consecutive = 1,
) => {
  let mb = 1;
  if (attacker.criticalHit) {
    mb *= 2;
  }
  if (attacker.item === "いのちのたま") {
    mb *= 1.3;
  }
  if (attacker.item === "メトロノーム") {
    mb *= 1 + consecutive * 0.1;
  }
  if (defender.ability === "たいねつ" && attacker.move?.type === "ほのお") {
    mb *= 0.5;
  }
  return mb;
};
