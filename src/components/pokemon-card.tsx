import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { FactoryPokemon } from '@/types/factoryPokemon';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback, AvatarImage } from './ui/avatar';
import { MoveCard } from './move-card';
import { AutoComplete } from './auto-complete';
import { Move } from '@/types/move';

export const PokemonCard = ({
  initialPokemon,
}: {
  initialPokemon: FactoryPokemon;
}) => {
  const [pokemon, setPokemon] = useState<FactoryPokemon>(initialPokemon);
  const [move, setMove] = useState<Move>(initialPokemon.moves[0]);

  const handleMoveChange = (move: Move) => {
    setMove(move);
  };

  const data = pokemon.pokemon;
  return (
    <Card className={`my-2 max-w-xl`}>
      <CardHeader className="flex items-center">
        <Avatar>
          <AvatarImage src={data.imageSrc} className="w-15 h-15" />
          <AvatarFallback>{data.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <CardTitle>
          <AutoComplete setPokemon={setPokemon} initialPokemon={pokemon} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <strong>
          <Badge>タイプ</Badge> {pokemon.pokemon.type1}
          {pokemon.pokemon.type2 && ` / ${pokemon.pokemon.type2}`}{' '}
          <Badge>種族値</Badge> {data.hp}-{data.attack}-{data.defense}-
          {data.spAttack}-{data.spDefense}-{data.speed}
        </strong>
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
      </CardContent>
    </Card>
  );
};
