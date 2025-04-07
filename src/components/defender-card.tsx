import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { FactoryPokemon } from '@/types/factoryPokemon';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback, AvatarImage } from './ui/avatar';
import { AutoComplete } from './auto-complete';
import { useDispatch } from 'react-redux';
import { setDefender } from '@/store/slices/defenderSlice';
import { PokemonDescription } from './pokemon-description';
export const DefenderCard = ({
  initialPokemon,
}: {
  initialPokemon: FactoryPokemon;
}) => {
  const [pokemon, setPokemon] = useState<FactoryPokemon>(initialPokemon);
  const dispatch = useDispatch();

  const handlePokemonChange = (pokemon: FactoryPokemon) => {
    setPokemon(pokemon);
    dispatch(setDefender({ pokemon: pokemon }));
  };

  const data = pokemon.pokemon;
  return (
    <Card className={`my-2 max-w-2xl`}>
      <CardHeader className="flex items-center">
        <Avatar>
          <AvatarImage src={data.imageSrc} className="w-15 h-15" />
          <AvatarFallback>{data.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <CardTitle>
          <AutoComplete
            setPokemon={handlePokemonChange}
            initialPokemon={pokemon}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <PokemonDescription
          factroyPokemon={pokemon}
          setAbility={() => {}}
          setItem={() => {}}
        />
      </CardContent>
    </Card>
  );
};
