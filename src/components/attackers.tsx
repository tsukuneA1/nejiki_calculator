import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { PokemonCard } from './pokemon-card';
import { Button } from './ui/button';
import { addAttacker, deleteAttacker } from '@/store/slices/attackerSlice';
import { AttackerReserve } from './attacker-reserve';

export const Attackers = () => {
  const attackers = useSelector((state: RootState) => state.attacker);
  const dispatch = useDispatch();

  const handleDelete = (pos: number) => {
    if (attackers.length > 1) {
      dispatch(deleteAttacker(pos));
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold ml-3 my-4">Attacker</h1>
      <AttackerReserve />
      {attackers.map((_, index) => (
        <div key={index}>
          <PokemonCard pos={index} handleDelete={() => handleDelete(index)} />
        </div>
      ))}
      <div className="flex justify-center">
        <Button
          onClick={() =>
            dispatch(
              addAttacker(attackers[attackers.length - 1].factoryPokemon!)
            )
          }
        >
          追加
        </Button>
      </div>
    </div>
  );
};
