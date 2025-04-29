import { FactoryPokemon } from '@/types/factoryPokemon';
import { calculateActual, calculateHActual } from './calculate_actual';
import { calculateNatureEffects } from './calculate_natureEffects';

export const calculateStatus = (
  pokemon: FactoryPokemon,
  settings: { level: number; times: number }
) => {
  let iv = 4*(settings.times - 1);
  if (settings.times == 8) {
    iv = 31;
  }
  const hp = calculateHActual(
    pokemon.pokemon.hp,
    pokemon.hp,
    iv,
    settings.level
  );
  const attack = calculateActual(
    pokemon.pokemon.attack,
    pokemon.attack,
    iv,
    settings.level,
    calculateNatureEffects(pokemon.nature, 'attack')
  );
  const defense = calculateActual(
    pokemon.pokemon.defense,
    pokemon.defense,
    iv,
    settings.level,
    calculateNatureEffects(pokemon.nature, 'defense')
  );
  const spAttack = calculateActual(
    pokemon.pokemon.spAttack,
    pokemon.spAttack,
    iv,
    settings.level,
    calculateNatureEffects(pokemon.nature, 'spAttack')
  );
  const spDefense = calculateActual(
    pokemon.pokemon.spDefense,
    pokemon.spDefense,
    iv,
    settings.level,
    calculateNatureEffects(pokemon.nature, 'spDefense')
  );
  const speed = calculateActual(
    pokemon.pokemon.speed,
    pokemon.speed,
    iv,
    settings.level,
    calculateNatureEffects(pokemon.nature, 'speed')
  );
  return { hp, attack, defense, spAttack, spDefense, speed };
};
