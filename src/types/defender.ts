import type { FactoryPokemon } from "./factoryPokemon";

export type Defender = {
	factoryPokemon: FactoryPokemon | null;
	iv: number;
	ability: string | null;
	item: string | null;
	bRank: number;
	dRank: number;
};
