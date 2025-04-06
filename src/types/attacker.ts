import { FactoryPokemon } from './factoryPokemon';
import { Move } from './move';

export type Attacker = {
  factoryPokemon: FactoryPokemon | null;
  ability: string | null;
  item: string | null;
  attackRank: number;
  move: Move | null;
  criticalHit: boolean;
  burned: boolean;
};
