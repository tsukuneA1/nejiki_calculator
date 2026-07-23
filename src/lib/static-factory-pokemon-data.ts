import type { FactoryPokemon } from "@/types/factoryPokemon";
import factoryPokemonData from "../../prisma/seed/source/factory-pokemons.json";

const factoryPokemons = factoryPokemonData as FactoryPokemon[];

export const getStaticFactoryPokemonSpeciesIds = (): number[] => {
  return [
    ...new Set(
      factoryPokemons.map((factoryPokemon) => factoryPokemon.pokemon.id),
    ),
  ].sort((a, b) => a - b);
};

export const getStaticFactoryPokemonsByPokemonId = (
  pokemonId: number,
): FactoryPokemon[] => {
  return factoryPokemons
    .filter((factoryPokemon) => factoryPokemon.pokemon.id === pokemonId)
    .sort((a, b) => a.group - b.group || a.id - b.id);
};
