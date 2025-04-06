import { calculateDamage } from '@/functions/calculate_damage';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

export const Damage = () => {
  const attacker = useSelector((state: RootState) => state.attacker[0]);
  const defender = useSelector((state: RootState) => state.defender);
  const level = useSelector((state: RootState) => state.level);

  const damage = calculateDamage(attacker, defender, level, {
    weather: 'clear',
    wall: false,
  });
  return (
    <div>
      {damage ? damage : 'ダメージを計算してください'}
      <br />
      {attacker.factoryPokemon
        ? attacker.factoryPokemon.pokemon.name
        : '攻撃ポケモンを選択してください'}
      <br />
      {defender.factoryPokemon
        ? defender.factoryPokemon.pokemon.name
        : '防御ポケモンを選択してください'}{' '}
      <br />
      {attacker.move ? attacker.move.name : '攻撃技を選択してください'}
    </div>
  );
};
