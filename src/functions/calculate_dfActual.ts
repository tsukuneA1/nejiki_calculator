import { Defender } from '@/types/defender';
import { calculateSM } from './calculate_atActual';
import { calculateStatus } from './calculate_status';
import { Attacker } from '@/types/attacker';
import { Move } from '@/types/move';

export const calculateDfActual = (
  attacker: Attacker,
  defender: Defender,
  settings: {
    level: number;
    times: number;
  }
) => {
  const bSM = calculateSM(defender.bRank);
  const dSM = calculateSM(defender.dRank);
  const am = calculateAM(defender.ability!, attacker.move!);
  const im = calculateIM(defender.item!);

  const status = calculateStatus(defender.factoryPokemon!, settings);

  if (attacker.move?.classification == '物理') {
    return Math.floor(status.defense * bSM * am * im);
  } else {
    return Math.floor(status.spDefense * dSM * am * im);
  }
};

const calculateAM = (ability: string, move: Move) => {
  if (ability == 'フラワーギフト' && move.classification == '特殊') {
    return 1.5;
  }
  return 1;
};

const calculateIM = (item: string) => {
  if (item == 'しんかのきせき') {
    return 1.5;
  }
  return 1;
};
