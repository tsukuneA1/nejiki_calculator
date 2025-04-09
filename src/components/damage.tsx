import { calculateDamage } from '@/functions/calculate_damage';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { Progress } from './ui/progress';
import { calculateStatus } from '@/functions/calculate_status';
import { Attacker } from '@/types/attacker';
import { Defender } from '@/types/defender';
import { Env } from '@/types/env';
import { calculateCompatibility } from '@/functions/calculate_compatibility';

export const Damage = () => {
  const attackers = useSelector((state: RootState) => state.attacker);
  const defender = useSelector((state: RootState) => state.defender);
  const level = useSelector((state: RootState) => state.level.level);
  const env = useSelector((state: RootState) => state.env);

  const status = calculateStatus(defender.factoryPokemon!, level);
  const hActual = status.hp;

  const { maxSumDamage: maxDamage, minSumDamage: minDamage } =
    calculateSumDamage(attackers, defender, level, env, hActual);

  const damageText = `${minDamage}~${maxDamage} (${Math.ceil((minDamage / hActual) * 1000) / 10}%~${Math.ceil((maxDamage / hActual) * 1000) / 10}%)`;
  return (
    <div>
      <Progress
        value={
          (maxDamage / status.hp) * 100 > 100
            ? 100
            : (maxDamage / status.hp) * 100
        }
        className="w-[80%]"
      />
      {damageText}
    </div>
  );
};

const calculateMinMaxDamage = (
  attacker: Attacker,
  defender: Defender,
  level: number,
  env: Env
) => {
  const maxDamage = calculateDamage(attacker, defender, level, env);
  const minDamage = Math.floor(maxDamage * 0.85);
  return { maxDamage, minDamage };
};

const calculateSumDamage = (
  attackers: Attacker[],
  defender: Defender,
  level: number,
  env: Env,
  hp: number
) => {
  const typeCompatibility = defender.factoryPokemon!.pokemon.type2
    ? calculateCompatibility('いわ', defender.factoryPokemon!.pokemon.type2) *
      calculateCompatibility('いわ', defender.factoryPokemon!.pokemon.type1)
    : calculateCompatibility('いわ', defender.factoryPokemon!.pokemon.type1);
  const stealthRockDamage = env.stealthRock
    ? Math.floor(hp / 8) * typeCompatibility
    : 0;
  const lifeOrbDamage = env.lifeOrb ? Math.floor(hp / 10) : 0;
  let maxSumDamage = stealthRockDamage + lifeOrbDamage;
  let minSumDamage = stealthRockDamage + lifeOrbDamage;
  attackers.map((attacker) => {
    const { maxDamage, minDamage } = calculateMinMaxDamage(
      attacker,
      defender,
      level,
      env
    );
    maxSumDamage += maxDamage;
    minSumDamage += minDamage;
  });
  return { maxSumDamage, minSumDamage };
};
