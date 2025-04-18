import { Attacker } from '@/types/attacker';
import { Defender } from '@/types/defender';
import { calculateMA } from './calculate_ma';
import { calculateMB } from './calculate_mb';
import { calculateMC } from './calculate_mc';
import { Env } from '@/types/env';
import { calculateCompatibility } from './calculate_compatibility';
import { calculateAtActual } from './calculate_atActual';
import { calculateDfActual } from './calculate_dfActual';

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

  if (
    attacker.move!.power == null ||
    attacker.move!.power === 0 ||
    attacker.move!.type == null
  ) {
    return 0;
  }

  const atPoke = attacker.factoryPokemon!;
  const dfPoke = defender.factoryPokemon!;

  const typePower =
    attacker.move!.type === atPoke.pokemon.type1 ||
    attacker.move!.type === atPoke.pokemon.type2
      ? 1.5
      : 1;
  const compatibility = dfPoke.pokemon.type2
    ? calculateCompatibility(attacker.move!.type, dfPoke.pokemon.type1) *
      calculateCompatibility(attacker.move!.type, dfPoke.pokemon.type2!)
    : calculateCompatibility(attacker.move!.type, dfPoke.pokemon.type1);

  const ma = calculateMA(attacker, defender, env);
  const mb = calculateMB(attacker, defender);
  const mc = calculateMC(attacker, defender, compatibility);

  const attack = calculateAtActual(attacker, level);
  const defense = calculateDfActual(attacker, defender, level);

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
