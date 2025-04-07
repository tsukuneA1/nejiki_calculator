import { FactoryPokemon } from '@/types/factoryPokemon';
import { calculateActual, calculateHActual } from './calculate_actual';
import { calculateNatureEffects } from './calculate_natureEffects';

export const calculateStatus = (pokemon: FactoryPokemon, level: number) => {
  let iv;
  if (level == 50) {
    iv = 4 * (pokemon.group - 1);
  } else {
    iv = 4 * (pokemon.group - 4);
  }
  const hp = calculateHActual(pokemon.pokemon.hp, pokemon.hp, iv, level);
  const attack = calculateActual(
    pokemon.pokemon.attack,
    pokemon.attack,
    iv,
    level,
    calculateNatureEffects(pokemon.nature, 'attack')
  );
  const defense = calculateActual(
    pokemon.pokemon.defense,
    pokemon.defense,
    iv,
    level,
    calculateNatureEffects(pokemon.nature, 'defense')
  );
  const spAttack = calculateActual(
    pokemon.pokemon.spAttack,
    pokemon.spAttack,
    iv,
    level,
    calculateNatureEffects(pokemon.nature, 'spAttack')
  );
  const spDefense = calculateActual(
    pokemon.pokemon.spDefense,
    pokemon.spDefense,
    iv,
    level,
    calculateNatureEffects(pokemon.nature, 'spDefense')
  );
  const speed = calculateActual(
    pokemon.pokemon.speed,
    pokemon.speed,
    iv,
    level,
    calculateNatureEffects(pokemon.nature, 'speed')
  );
  return { hp, attack, defense, spAttack, spDefense, speed };
};
