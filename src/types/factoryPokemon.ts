import type { Pokemon } from "./pokemon";

export type Move = {
  id: number;
  name: string;
  type: string;
  power: number | null;
  accuracy: number | null;
  pp: number;
  classification: string;
  super: boolean;
};

export type FactoryPokemon = {
  id: number;
  pokemon: Pokemon;
  hp: number;
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;
  moves: Move[];
  item: string;
  group: number;
  nature: string;
};
