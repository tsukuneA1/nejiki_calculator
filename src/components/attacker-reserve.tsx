import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from './ui/button';
import { MaterialSymbolsDeleteOutline } from './icons/delete';
import { AutoComplete } from './auto-complete';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useState } from 'react';
import { FactoryPokemon } from '@/types/factoryPokemon';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback, AvatarImage } from './ui/avatar';
import { setAttacker } from '@/store/slices/attackerSlice';

export const AttackerReserve = () => {
  const level = useSelector((state: RootState) => state.level);
  const [selectedId, setSelectedId] = useState('');
  const [spares, setSpares] = useState<FactoryPokemon[]>([]);
  const attacker = useSelector((state: RootState) => state.attacker[0]);
  const dispatch = useDispatch();

  const handleAddSpare = (pokemon: FactoryPokemon) => {
    if (!spares.includes(pokemon) && spares.length <= 6) {
      setSpares([...spares, pokemon]);
    }
  };

  const handleDeleteSpare = () => {
    if (selectedId != '') {
      const updated = spares.filter(
        (spare) => spare.id.toString() != selectedId
      );
      setSpares(updated);
      setSelectedId('');
    }
  };

  const handleClickSelectedPoke = (pokemon: FactoryPokemon) => {
    if (pokemon.id.toString() === selectedId) {
      const updatedSpares = spares.filter((spare) => spare.id !== pokemon.id);

      if (attacker.factoryPokemon) {
        updatedSpares.push(attacker.factoryPokemon);
      }
      setSpares(updatedSpares);

      dispatch(setAttacker({ pokemon, pos: 0 }));

      setSelectedId('');
    }
  };

  return (
    <div className="flex items-center justify-between border-1 rounded-lg p-2">
      <ToggleGroup
        type="single"
        variant="outline"
        onValueChange={(value) => setSelectedId(value)}
      >
        {spares.map((spare) => {
          return (
            <ToggleGroupItem
              value={spare.id.toString()}
              aria-label={spare.id.toString()}
              onClick={() => handleClickSelectedPoke(spare)}
              key={spare.id}
            >
              <Avatar>
                <AvatarImage src={spare.pokemon.imageSrc} className="w-9 h-9" />
                <AvatarFallback>
                  {spare.pokemon.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
      <div className="flex items-center gap-2">
        <AutoComplete
          trigger={
            <Button size="icon" className="w-9 h-9">
              +
            </Button>
          }
          level={level.level}
          times={level.times}
          setPokemon={handleAddSpare}
        />

        <Button size="icon" onClick={handleDeleteSpare}>
          <MaterialSymbolsDeleteOutline />
        </Button>
      </div>
    </div>
  );
};
