import type { FactoryPokemon } from "./factoryPokemon";
import type { Move } from "./move";

export type Attacker = {
	factoryPokemon: FactoryPokemon | null;
	iv: number;
	ability: string | null;
	item: string | null;
	attackRank: number;
	move: Move | null;
	criticalHit: boolean;
	burned: boolean;
	rank: number;
};
