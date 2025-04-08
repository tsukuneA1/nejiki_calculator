import { Attacker } from '@/types/attacker';
import { Move } from '@/types/move';
import { calculateStatus } from './calculate_status';

export const calculateAtActual = (attacker: Attacker, level: number) => {
  const sm = calculateSM(attacker.rank);
  const am = calculateAM(attacker.ability!, attacker.move!);
  const im = calculateIM(attacker.item!, attacker.move!);

  if (attacker.move?.classification == '物理') {
    return (
      calculateStatus(attacker.factoryPokemon!, level).attack * sm * am * im
    );
  } else {
    return (
      calculateStatus(attacker.factoryPokemon!, level).spAttack * sm * am * im
    );
  }
};

const calculateSM = (rank: number) => {
  if (rank > 0) {
    return 1 + 0.5 * rank;
  } else if (rank < 0) {
    return 2 / (2 - rank);
  } else {
    return 1;
  }
};

const calculateAM = (ability: string, move: Move) => {
  if (ability == 'げきりゅう' && move.type == 'みず') {
    return 1.5;
  }

  if (ability == 'もうか' && move.type == 'ほのお') {
    return 1.5;
  }

  if (ability == 'しんりょく' && move.type == 'くさ') {
    return 1.5;
  }
  return 1;
};

const calculateIM = (item: string, move: Move) => {
  return 1;
};
