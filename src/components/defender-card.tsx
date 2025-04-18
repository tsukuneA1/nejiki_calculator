import { CardTitle } from './ui/card';
import { FactoryPokemon } from '@/types/factoryPokemon';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback, AvatarImage } from './ui/avatar';
import { AutoComplete } from './auto-complete';
import { useDispatch, useSelector } from 'react-redux';
import { setDefender, setBRank, setDRank } from '@/store/slices/defenderSlice';
import { PokemonDescription } from './pokemon-description';
import { RootState } from '@/store/store';
import { Rank } from './rank';
import { CardLayout } from '@/layouts/card/card-layout';

export const DefenderCard = () => {
  const defender = useSelector((state: RootState) => state.defender);
  const pokemon = defender.factoryPokemon!;
  const level = useSelector((state: RootState) => state.level);
  const dispatch = useDispatch();

  const handlePokemonChange = (pokemon: FactoryPokemon) => {
    dispatch(setDefender({ pokemon: pokemon }));
  };

  const data = pokemon.pokemon;
  return (
    <CardLayout
      header={
        <>
          <Avatar>
            <AvatarImage
              src={data.imageSrc}
              className="w-15 h-15 border-1 border-gray-300 rounded-lg"
            />
            <AvatarFallback>{data.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <CardTitle>
            <AutoComplete
              setPokemon={handlePokemonChange}
              initialPokemon={pokemon}
              level={level.level}
              times={level.times}
            />
          </CardTitle>
        </>
      }
      content={
        <>
          <PokemonDescription
            factroyPokemon={pokemon}
            setAbility={() => {}}
            setItem={() => {}}
          />
          <Rank
            rank={defender.bRank}
            badgeName="防御ランク"
            setRank={(rank: number) => {
              dispatch(setBRank({ rank: rank }));
            }}
          />
          <Rank
            rank={defender.dRank}
            badgeName="特防ランク"
            setRank={(rank: number) => {
              dispatch(setDRank({ rank: rank }));
            }}
          />
        </>
      }
    />
  );
};
