import { calculateDamage } from '@/functions/calculate_damage';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { calculateStatus } from '@/functions/calculate_status';
import { Attacker } from '@/types/attacker';
import { Defender } from '@/types/defender';
import { Env } from '@/types/env';
import { calculateCompatibility } from '@/functions/calculate_compatibility';
import MultiProgress from './ui/multiprogress';

export const Damage = () => {
  const attackers = useSelector((state: RootState) => state.attacker);
  const defender = useSelector((state: RootState) => state.defender);
  const settings = useSelector((state: RootState) => state.settings);
  const env = useSelector((state: RootState) => state.env);

  const status = calculateStatus(defender.factoryPokemon!, settings.level, defender.iv);
  const hActual = status.hp;

  const { maxSumDamage: maxDamage, minSumDamage: minDamage } =
    calculateSumDamage(attackers, defender, settings, env, hActual);

  const damageText = `${minDamage}~${maxDamage} (${Math.ceil((minDamage / hActual) * 1000) / 10}%~${Math.ceil((maxDamage / hActual) * 1000) / 10}%)`;
  return (
    <div>
      <MultiProgress
        value1={(minDamage / status.hp) * 100}
        value2={(maxDamage / status.hp) * 100}
        className="w-[80%]"
      />
      <div className="text-black">{damageText}</div>
    </div>
  );
};

const calculateMinMaxDamage = (
  attacker: Attacker,
  defender: Defender,
  settings: {
    level: number;
    times: number;
  },
  env: Env
) => {
  const maxDamage = calculateDamage(attacker, defender, settings, env);
  const minDamage = Math.floor(maxDamage * 0.85);
  return { maxDamage, minDamage };
};

const calculateSumDamage = (
  attackers: Attacker[],
  defender: Defender,
  settings: {
    level: number;
    times: number;
  },
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
      settings,
      env
    );
    maxSumDamage += maxDamage;
    minSumDamage += minDamage;
  });
  return { maxSumDamage, minSumDamage };
};
