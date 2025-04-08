import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { FactoryPokemon } from '@/types/factoryPokemon';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback, AvatarImage } from './ui/avatar';
import { MoveCard } from './move-card';
import { AutoComplete } from './auto-complete';
import { Move } from '@/types/move';
import { setAttacker, setMove, setRank } from '@/store/slices/attackerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { PokemonDescription } from './pokemon-description';
import { RootState } from '@/store/store';
import { Rank } from './rank';

export const PokemonCard = ({pos}: {pos: number}) => {
  const attacker = useSelector((state: RootState) => state.attacker[pos]);
  const pokemon = attacker.factoryPokemon!;
  const move = useSelector((state: RootState) => state.attacker[pos].move);
  const dispatch = useDispatch();

  const handlePokemonChange = (pokemon: FactoryPokemon) => {
    dispatch(setAttacker({ pokemon: pokemon, pos: pos }));
  };

  const handleMoveChange = (move: Move) => {
    dispatch(setMove({ move: move, pos: pos }));
  };

  const handleRankChange = (rank: number) => {
    dispatch(setRank({ rank: rank, pos: pos }));
  };

  const data = pokemon.pokemon;

  return (
    <Card className="my-2 w-sm max-w-xl sm:w-xl">
      <CardHeader className="flex items-center">
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
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <PokemonDescription
          factroyPokemon={pokemon}
          setAbility={() => {}}
          setItem={() => {}}
        />
        <Rank rank={attacker.rank} badgeName="ランク補正" setRank={handleRankChange} />
        <Badge className="w-18">技</Badge>
        <div className="sm:grid sm:grid-cols-2 gap-2 ">
          <MoveCard
            move={pokemon.moves[0]}
            handleMoveChange={handleMoveChange}
            isSelected={move === pokemon.moves[0]}
          />
          <MoveCard
            move={pokemon.moves[1]}
            handleMoveChange={handleMoveChange}
            isSelected={move === pokemon.moves[1]}
          />
          <MoveCard
            move={pokemon.moves[2]}
            handleMoveChange={handleMoveChange}
            isSelected={move === pokemon.moves[2]}
          />
          <MoveCard
            move={pokemon.moves[3]}
            handleMoveChange={handleMoveChange}
            isSelected={move === pokemon.moves[3]}
          />
        </div>
      </CardContent>
    </Card>
  );
};
