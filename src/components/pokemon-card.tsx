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
import { useDispatch } from 'react-redux';

export const PokemonCard = ({
  initialPokemon,
}: {
  initialPokemon: FactoryPokemon;
}) => {
  const [pokemon, setPokemon] = useState<FactoryPokemon>(initialPokemon);
  const [move, setMoves] = useState<Move>(initialPokemon.moves[0]);

  const dispatch = useDispatch();

  const handlePokemonChange = (pokemon: FactoryPokemon) => {
    setPokemon(pokemon);
    dispatch(setAttacker({ pokemon: pokemon, pos: 0 }));
  };

  const handleMoveChange = (move: Move) => {
    dispatch(setMove({ move: move, pos: 0 }));
    setMoves(move);
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
        <strong>
          <Badge>タイプ</Badge> {pokemon.pokemon.type1}
          {pokemon.pokemon.type2 && ` / ${pokemon.pokemon.type2}`}{' '}
          <Badge>種族値</Badge> {data.hp}-{data.attack}-{data.defense}-
          {data.spAttack}-{data.spDefense}-{data.speed}
        </strong>
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
