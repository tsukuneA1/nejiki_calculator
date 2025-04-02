import { MainLayout } from "@/layouts/main/main-layout";
import { useEffect, useState } from "react";
import { Move } from "@/types/move";
import { MoveCard } from "@/components/move-card";
import { Pokemon } from "@/types/pokemon";

export default function Home() {
  const [moves, setMoves] = useState<Move[]>([]);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetch("/api/moves")
      .then((res) => res.json())
      .then((data) => setMoves(data))
      .catch((error) => console.error('Error fetching moves:', error));
  }, []);

  useEffect(() => {
    fetch("/api/pokemons")
      .then((res) => res.json())
      .then((data) => setPokemons(data))
      .catch((error) => console.error('Error fetching pokemons:', error));
  }, []);

  return (
    <MainLayout>
      <h2>hello world</h2>
      <ol>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <div>{pokemon.name}</div>
          </li>
        ))}
      </ol>
      <ol className="ml-5">
        {moves.map((move) => (
          <li key={move.id}>
            <MoveCard move={move} />
          </li>
        ))}
      </ol>
    </MainLayout>
  );
}
