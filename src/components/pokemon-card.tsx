import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { FactoryPokemon } from '@/types/factoryPokemon';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback, AvatarImage } from './ui/avatar';
import { MoveCard } from './move-card';
import { AutoComplete } from './auto-complete';
import { Move } from '@/types/move';
import { setAttacker, setMove } from '@/store/slices/attackerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { calculateStatus } from '@/functions/calculate_status';
import { RootState } from '@/store/store';

export const PokemonCard = ({
  initialPokemon,
}: {
  initialPokemon: FactoryPokemon;
}) => {
  const [pokemon, setPokemon] = useState<FactoryPokemon>(initialPokemon);
  const [move, setMoves] = useState<Move>(initialPokemon.moves[0]);
  const level = useSelector((state: RootState) => state.level.level);
  const dispatch = useDispatch();

  const handlePokemonChange = (pokemon: FactoryPokemon) => {
    setPokemon(pokemon);
    dispatch(setAttacker({ pokemon: pokemon, pos: 0 }));
  };

  const handleMoveChange = (move: Move) => {
    dispatch(setMove({ move: move, pos: 0 }));
    setMoves(move);
  };

  const status = calculateStatus(pokemon, level);

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
      <div className="space-y-2">
  <div className="flex items-center gap-2">
    <Badge className='w-18'>タイプ</Badge>
    <div>
      {pokemon.pokemon.type1}
      {pokemon.pokemon.type2 && ` / ${pokemon.pokemon.type2}`}
    </div>
  </div>
  <div className="flex items-center gap-2">
    <Badge className='w-18'>ステータス</Badge>
    <div>
      {status.hp}-{status.attack}-{status.defense}-
      {status.spAttack}-{status.spDefense}-{status.speed}
    </div>
  </div>
</div>
 <Badge className='w-18'>技</Badge>

        <div className="md:grid md:grid-cols-2 gap-2 ">
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
