import { MainLayout } from '@/layouts/main/main-layout';
import { useEffect, useState } from 'react';
import { FactoryPokemon } from '@/types/factoryPokemon';
import { PokemonCard } from '@/components/pokemon-card';
import { DefenderCard } from '@/components/defender-card';
import { Checkbox } from '@/components/ui/checkbox';
import { setLevel, setTimes } from '@/store/slices/levelSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';

export default function Home() {
  const [factoryPokemons, setFactoryPokemons] = useState<FactoryPokemon[]>([]);
  const level = useSelector((state: RootState) => state.level.level);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/api/factory_pokemon')
      .then((res) => res.json())
      .then((data) => setFactoryPokemons(data))
      .catch((error) =>
        console.error('Error fetching factory pokemons:', error)
      );
  }, []);

  const handleLevelChange = (level: number) => {
    dispatch(setLevel(level));
  };

  return (
    <MainLayout>
      <div className="flex items-center space-x-2 ml-5">
        <Checkbox
          id="terms"
          checked={level == 50}
          onClick={() => handleLevelChange(50)}
          className="w-5 h-5 border-2"
        />
        <label
          htmlFor="terms"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          50レベル
        </label>
        <Checkbox
          id="terms"
          checked={level == 100}
          onClick={() => handleLevelChange(100)}
          className="w-5 h-5 border-2"
        />
        <label
          htmlFor="terms"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          オープンレベル
        </label>
      </div>
      <div className="ml-5 mt-2">
        <Select onValueChange={(value) => dispatch(setTimes(parseInt(value)))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="周回回数を選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>周回回数</SelectLabel>
              {[...Array(7)].map((_, i) => (
                <SelectItem key={i} value={`${i + 1}`}>
                  {i + 1}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <ol className="ml-5 2xl:flex">
        {factoryPokemons.length >= 2 &&
          factoryPokemons[0] &&
          factoryPokemons[1] && (
            <>
              <li key={factoryPokemons[0].id}>
                <PokemonCard initialPokemon={factoryPokemons[0]} />
              </li>
              <li key={factoryPokemons[1].id}>
                <DefenderCard initialPokemon={factoryPokemons[1]} />
              </li>
            </>
          )}
      </ol>
    </MainLayout>
  );
}
