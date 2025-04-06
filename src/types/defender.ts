import { FactoryPokemon } from './factoryPokemon';

export type Defender = {
  factoryPokemon: FactoryPokemon | null;
  ability: string | null;
  item: string | null;
  defenseRank: number;
};
