import type { Attacker } from "@/types/attacker";
import type { Move } from "@/types/move";
import type { Pokemon } from "@/types/pokemon";
import { calculateStatus } from "./calculate_status";

export const calculateAtActual = (
	attacker: Attacker,
	settings: { level: number; times: number },
) => {
	const sm = calculateSM(attacker.rank);
	const am = calculateAM(attacker.ability!, attacker.move!);
	const am2 = calculateAM2(attacker.ability!, attacker.move!);
	const im = calculateIM(
		attacker.item!,
		attacker.move!,
		attacker.factoryPokemon?.pokemon,
	);

	if (attacker.move?.classification === "物理") {
		return Math.floor(
			calculateStatus(attacker.factoryPokemon!, settings.level, attacker.iv)
				.attack *
				sm *
				am *
				am2 *
				im,
		);
	}
	return Math.floor(
		calculateStatus(attacker.factoryPokemon!, settings.level, attacker.iv)
			.spAttack *
			sm *
			am *
			am2 *
			im,
	);
};

export const calculateSM = (rank: number) => {
	if (rank > 0) {
		return 1 + 0.5 * rank;
	}
	if (rank < 0) {
		return 2 / (2 - rank);
	}
	return 1;
};

const calculateAM = (ability: string, move: Move) => {
	if (ability === "スロースタート" && move.classification === "物理") {
		return 0.5;
	}

	if (ability === "げきりゅう" && move.type === "みず") {
		return 1.5;
	}

	if (ability === "もうか" && move.type === "ほのお") {
		return 1.5;
	}

	if (ability === "しんりょく" && move.type === "くさ") {
		return 1.5;
	}
	if (ability === "むしのしらせ" && move.type === "むし") {
		return 1.5;
	}

	if (ability === "サンパワー" && move.classification === "特殊") {
		return 1.5;
	}

	if (ability === "プラス" || ability === "マイナス") {
		return 1.5;
	}

	if (ability === "ちからもち" && move.classification === "物理") {
		return 2;
	}

	return 1;
};

const calculateAM2 = (ability: string, move: Move) => {
	if (ability === "あついしぼう" && ["ほのお", "こおり"].includes(move.type)) {
		return 0.5;
	}

	if (ability === "たいねつ" && move.type === "ほのお") {
		return 0.5;
	}
	return 1;
};

const calculateIM = (item: string, move: Move, pokemon: Pokemon) => {
	if (item === "こだわりハチマキ" && move.classification === "物理") {
		return 1.5;
	}

	if (item === "こだわりメガネ" && move.classification === "特殊") {
		return 1.5;
	}

	if (
		item === "ふといホネ" &&
		["ガラガラ", "カラカラ"].includes(pokemon.name) &&
		move.classification === "物理"
	) {
		return 2;
	}

	if (item === "でんきだま" && pokemon.name === "ピカチュウ") {
		return 2;
	}
	return 1;
};
