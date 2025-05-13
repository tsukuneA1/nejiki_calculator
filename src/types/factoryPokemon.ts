import type { Move } from "@prisma/client";
import type { Pokemon } from "./pokemon";

export type FactoryPokemon = {
	id: number;
	pokemon: Pokemon;
	hp: number;
	attack: number;
	defense: number;
	spAttack: number;
	spDefense: number;
	speed: number;
	moves: Move[];
	item: string;
	group: number;
	nature: string;
};
