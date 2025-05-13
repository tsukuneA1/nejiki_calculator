import type { Attacker } from "@/types/attacker";
import type { Defender } from "@/types/defender";
import type { Env } from "@/types/env";

export const calculateMA = (
	attacker: Attacker,
	defender: Defender,
	env: Env,
) => {
	let ma = 1;
	const move = attacker.move!;
	if (attacker.burned && move.classification === "物理") {
		ma *= 0.5;
	}

	if (env.reflect && move.classification === "物理") {
		ma *= 0.5;
	}

	if (env.lightScreen && move.classification === "特殊") {
		ma *= 0.5;
	}

	if (env.weather === "あめ") {
		if (move.type === "みず") {
			ma *= 1.5;
		}
		if (move.type === "ほのお") {
			ma *= 0.5;
		}
	}

	if (env.weather === "にほんばれ") {
		if (move.type === "みず") {
			ma *= 0.5;
		}
		if (move.type === "ほのお") {
			ma *= 1.5;
		}
	}

	if (move.name === "ソーラービーム") {
		if (env.weather !== "にほんばれ" && env.weather !== "なし") {
			ma *= 0.5;
		}
	}

	if (attacker.ability === "もらいび" && move.type === "ほのお") {
		ma *= 1.5;
	}
	return ma;
};
