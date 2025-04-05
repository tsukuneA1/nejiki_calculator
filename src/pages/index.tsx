import { MainLayout } from "@/layouts/main/main-layout";
import { useEffect, useState } from "react";
import { FactoryPokemon } from "@/types/factoryPokemon";
import { PokemonCard } from "@/components/pokemon-card";

export default function Home() {
  const [factoryPokemons, setFactoryPokemons] = useState<FactoryPokemon[]>([]);
  
  useEffect(() => {
    fetch("/api/factory_pokemon")
      .then((res) => res.json())
      .then((data) => setFactoryPokemons(data))
      .catch((error) => console.error('Error fetching factory pokemons:', error));
  }, []);

  return (
    <MainLayout>
      <ol className="ml-5">
        {factoryPokemons.slice(930, 940).map((factoryPokemon) => (
          <li key={factoryPokemon.id}>
             <PokemonCard initialPokemon={factoryPokemon} />
          </li>
        ))}
      </ol>
    </MainLayout>
  );
}
