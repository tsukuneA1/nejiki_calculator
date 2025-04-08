import { calculateDamage } from '@/functions/calculate_damage';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { Progress } from './ui/progress';
import { calculateStatus } from '@/functions/calculate_status';

export const Damage = () => {
  const attacker = useSelector((state: RootState) => state.attacker[0]);
  const defender = useSelector((state: RootState) => state.defender);
  const level = useSelector((state: RootState) => state.level.level);
  const env = useSelector((state: RootState) => state.env);

  const status = calculateStatus(defender.factoryPokemon!, level);
  const maxDamage = calculateDamage(attacker, defender, level, {
    weather: env.weather,
    reflect: env.reflect,
    lightScreen: env.lightScreen,
  });
  const minDamage = Math.floor(maxDamage * 0.85);
  const hActual = status.hp;

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
