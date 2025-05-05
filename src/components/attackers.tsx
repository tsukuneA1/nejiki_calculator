import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { PokemonCard } from './pokemon-card';
import { Button } from './ui/button';
import { addAttacker, deleteAttacker } from '@/store/slices/attackerSlice';
import { AttackerReserve } from './attacker-reserve';
import { Swords } from 'lucide-react';

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
      <div className="flex items-center bg-white rounded-lg my-2 border">
        <Swords className="w-7 h-7 mx-2 text-black" />
        <h1 className="text-2xl font-bold ml-3 my-4 text-black">Attacker</h1>
      </div>
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
              addAttacker({
                pokemon: attackers[attackers.length - 1].factoryPokemon!,
                iv: attackers[attackers.length - 1].iv,
              })
            )
          }
        >
          追加
        </Button>
      </div>
    </div>
  );
};
