import { SubLayout } from '@/layouts/sub/sub-layout';
import { FactoryPokemon } from '@/types/factoryPokemon';
import { useEffect, useState } from 'react';

export default function PokeSearch() {
  const [factoryPokemons, setFactoryPokemons] = useState<FactoryPokemon[]>([]);
  useEffect(() => {
    const fetchFactoryPokemons = async () => {
      const response = await fetch('/api/factory-pokemons');
      const data = await response.json();
      setFactoryPokemons(data);
    };
    fetchFactoryPokemons();
  }, []);

  return (
    <SubLayout>
      <div>
        <h1>ポケモン検索</h1>
        <div>
          {factoryPokemons.map((pokemon) => (
            <div key={pokemon.id}>{pokemon.pokemon.name}</div>
          ))}
        </div>
      </div>
    </SubLayout>
  );
}
