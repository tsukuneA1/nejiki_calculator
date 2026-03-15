import type { FactoryPokemon } from "./factoryPokemon";

export type Defender = {
  factoryPokemon: FactoryPokemon | null;
  iv: number;
  ability: string | null;
  abilityEnabled: boolean;
  item: string | null;
  bRank: number;
  dRank: number;
};
