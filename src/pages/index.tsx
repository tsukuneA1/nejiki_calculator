import { MainLayout } from '@/layouts/main/main-layout';
import { useEffect, useState } from 'react';
import { FactoryPokemon } from '@/types/factoryPokemon';
import { PokemonCard } from '@/components/pokemon-card';
import { DefenderCard } from '@/components/defender-card';

export default function Home() {
  const [factoryPokemons, setFactoryPokemons] = useState<FactoryPokemon[]>([]);

  useEffect(() => {
    fetch('/api/factory_pokemon')
      .then((res) => res.json())
      .then((data) => setFactoryPokemons(data))
      .catch((error) =>
        console.error('Error fetching factory pokemons:', error)
      );
  }, []);

  return (
    <MainLayout>
      <ol className="ml-5 2xl:flex">
        <li key={factoryPokemons[0].id}>
          <PokemonCard initialPokemon={factoryPokemons[0]} />
        </li>
        <li key={factoryPokemons[1].id}>
          <DefenderCard initialPokemon={factoryPokemons[1]} />
        </li>
      </ol>
    </MainLayout>
  );
}
