import { Attacker } from '@/types/attacker';
import { Defender } from '@/types/defender';
import { calculateMA } from './calculate_ma';
import { calculateMB } from './calculate_mb';
import { calculateMC } from './calculate_mc';
import { Env } from '@/types/env';
import { calculateCompatibility } from './calculate_compatibility';
import { calculateStatus } from './calculate_status';

export const calculateDamage = (
  attacker: Attacker,
  defender: Defender,
  level: number,
  env: Env
) => {
  if (
    attacker.factoryPokemon == null ||
    attacker.move == null ||
    defender.factoryPokemon == null
  ) {
    return 0;
  }

  const atAct = calculateStatus(attacker.factoryPokemon, level);
  const dfAct = calculateStatus(defender.factoryPokemon, level);

  const atPoke = attacker.factoryPokemon!;
  const dfPoke = defender.factoryPokemon!;

  const typePower =
    attacker.move!.type === atPoke.pokemon.type1 ||
    attacker.move!.type === atPoke.pokemon.type2
      ? 1.5
      : 1;
  const compatibility = dfPoke.pokemon.type2
    ? calculateCompatibility(attacker.move!, dfPoke.pokemon.type1) * calculateCompatibility(attacker.move!, dfPoke.pokemon.type2!)
    : calculateCompatibility(attacker.move!, dfPoke.pokemon.type1);

  const ma = calculateMA(attacker, defender, env);
  const mb = calculateMB(attacker, defender);
  const mc = calculateMC(attacker, defender, compatibility);

  const attack =
    attacker.move.classification == '特殊' ? atAct.spAttack : atAct.attack;
  const defense =
    attacker.move.classification == '特殊' ? dfAct.spDefense : dfAct.defense;

  const damage =
    Math.floor(
      (Math.floor(
        (Math.floor((level * 2) / 5 + 2) * attacker.move!.power! * attack) /
          defense
      ) /
        50) *
        ma +
        2
    ) *
    mb *
    typePower *
    compatibility *
    mc;

  return Math.floor(damage);
};
