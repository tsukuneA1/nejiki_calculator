import { typeStrengthen } from "@/constants/items";
import type { Attacker } from "@/types/attacker";

export const calculateMovePower = (attacker: Attacker) => {
	const move = attacker.move;
	const item = attacker.item;

	if (!move || !item) {
		throw new Error("move または item が未定義です");
	}

	let movePower = move.power!;

	if (attacker.ability === "テクニシャン" && movePower <= 60) {
		movePower *= 1.5;
	}

	movePower *= typeStrengthen({
		type: move.type,
		item,
	});

	return movePower;
};
