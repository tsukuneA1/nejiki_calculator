import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { FactoryPokemon } from "@/types/factoryPokemon";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { MoveCard } from "./move-card";

export const PokemonCard = ({ pokemon }: { pokemon: FactoryPokemon }) => {

  const data = pokemon.pokemon;
  return (
    <Card
      className={`my-2 max-w-xl`}
    >
      <CardHeader>
        <Avatar>
          <AvatarImage src={data.imageSrc} />
          <AvatarFallback>{data.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <CardTitle>{pokemon.pokemon.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <strong>
          <Badge>タイプ</Badge> {pokemon.pokemon.type1}{pokemon.pokemon.type2 && ` / ${pokemon.pokemon.type2}`} <Badge>種族値</Badge> {data.hp}-{data.attack}-{data.defense}-{data.spAttack}-{data.spDefense}-{data.speed}
        </strong>
        <MoveCard move={pokemon.moves[0]} />
        <MoveCard move={pokemon.moves[1]} />
        <MoveCard move={pokemon.moves[2]} />
        <MoveCard move={pokemon.moves[3]} />
      </CardContent>
    </Card>
  );
};
