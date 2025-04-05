import { FactoryPokemon } from './factoryPokemon';
import { Move } from './move';

export type Attacker = {
  factoryPokemon: FactoryPokemon;
  act: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  ability: string;
  item: string;
  attackRank: number;
  move: Move;
  criticalHit: boolean;
  burned: boolean;
};
