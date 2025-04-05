import { FactoryPokemon } from './factoryPokemon';

export type Defender = {
  factoryPokemon: FactoryPokemon | null;
  act: {
    hp: number;
    attack: number;
    defense: number;
    spAttack: number;
    spDefense: number;
    speed: number;
  };
  ability: string | null;
  item: string | null;
  defenseRank: number;
};
