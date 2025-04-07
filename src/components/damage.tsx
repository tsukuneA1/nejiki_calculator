import { calculateDamage } from '@/functions/calculate_damage';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { Progress } from './ui/progress';
import { calculateStatus } from '@/functions/calculate_status';
import { useEffect, useState } from 'react';
export const Damage = () => {
  const attacker = useSelector((state: RootState) => state.attacker[0]);
  const defender = useSelector((state: RootState) => state.defender);
  const level = useSelector((state: RootState) => state.level.level);

  const status = calculateStatus(defender.factoryPokemon!, level);
  const maxDamage = calculateDamage(attacker, defender, level, {
    weather: 'clear',
    wall: false,
  });
  const minDamage = Math.floor(maxDamage*0.85);
  const hActual = status.hp;

  const damageText = `${minDamage}~${maxDamage} (${Math.ceil((minDamage / hActual) * 1000) / 10}%~${Math.ceil((maxDamage / hActual) * 1000) / 10}%)`;
  return (
    <div>
      <Progress value={maxDamage/status.hp*100 > 100 ? 100 : maxDamage/status.hp*100} className="w-[80%]"/>
      {damageText}
    </div>
  );
};
