import { CardTitle } from './ui/card';
import { FactoryPokemon } from '@/types/factoryPokemon';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback, AvatarImage } from './ui/avatar';
import { AutoComplete } from './auto-complete';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDefender,
  setBRank,
  setDRank,
  setDfAbility,
  setDfItem,
  setDfIv,
} from '@/store/slices/defenderSlice';
import { PokemonDescription } from './pokemon-description';
import { RootState } from '@/store/store';
import { Rank } from './rank';
import { CardLayout } from '@/layouts/card/card-layout';
import { Button } from './ui/button';

export const DefenderCard = () => {
  const defender = useSelector((state: RootState) => state.defender);
  const pokemon = defender.factoryPokemon!;
  const settings = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();

  const handlePokemonChange = (pokemon: FactoryPokemon) => {
    dispatch(setDefender({ pokemon: pokemon, iv: 4*(settings.times-1) }));
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
              level={settings.level}
              times={settings.times}
              isNejiki={settings.isNejiki}
              trigger={
                <Button
                  variant="ghost"
                  className="w-[150px] justify-start text-lg border-1 border-gray-300"
                >
                  {pokemon ? <>{pokemon.pokemon.name}</> : <>Set Pokemon</>}
                </Button>
              }
            />
          </CardTitle>
        </>
      }
      content={
        <>
          <PokemonDescription
            factroyPokemon={pokemon}
            setAbility={(value: string) => {
              dispatch(setDfAbility({ ability: value }));
            }}
            setItem={(value: string) => {
              dispatch(setDfItem({ item: value }));
            }}
            setIv={iv => dispatch(setDfIv(iv))}
            currentAbility={defender.ability || 'なし'}
            currentItem={defender.item || 'なし'}
            currentIv={defender.iv}
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
