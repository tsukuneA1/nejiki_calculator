import { FactoryPokemon } from './factoryPokemon';
import { Move } from './move';

export type Attacker = {
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
  attackRank: number;
  move: Move | null;
  criticalHit: boolean;
  burned: boolean;
};
