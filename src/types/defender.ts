import { FactoryPokemon } from './factoryPokemon';

export type Defender = {
  factoryPokemon: FactoryPokemon | null;
  ability: string | null;
  item: string | null;
  bRank: number;
  dRank: number;
};
