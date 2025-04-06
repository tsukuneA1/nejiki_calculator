import { calculateActual, calculateHActual } from '@/functions/calculate_actual';
import { calculateNatureEffects } from '@/functions/calculate_natureEffects';
import { Defender } from '@/types/defender';
import { createSlice } from '@reduxjs/toolkit';

const initialState: Defender = {
  factoryPokemon: null,
  act: {
    hp: 0,
    attack: 0,
    defense: 0,
    spAttack: 0,
    spDefense: 0,
    speed: 0,
  },
  ability: null,
  item: null,
  defenseRank: 0,
};

const defenderSlice = createSlice({
  name: 'defender',
  initialState,
  reducers: {
    setDefender: (state, action) => {
      const factoryPokemon = action.payload.pokemon;
      state.factoryPokemon = factoryPokemon;
      state.ability = factoryPokemon.ability1;
      state.item = factoryPokemon.item;
      state.defenseRank = 0;
      const level = 100;
      state.act = {
        hp: calculateHActual(factoryPokemon.pokemon.hp, factoryPokemon.group, factoryPokemon.pokemon.hp, level),
        attack: calculateActual(factoryPokemon.pokemon.attack, factoryPokemon.group, factoryPokemon.pokemon.attack, level, calculateNatureEffects(factoryPokemon.nature, 'attack')),
        defense: calculateActual(factoryPokemon.pokemon.defense, factoryPokemon.group, factoryPokemon.pokemon.defense, level, calculateNatureEffects(factoryPokemon.nature, 'defense')),
        spAttack: calculateActual(factoryPokemon.pokemon.spAttack, factoryPokemon.group, factoryPokemon.pokemon.spAttack, level, calculateNatureEffects(factoryPokemon.nature, 'spAttack')),
        spDefense: calculateActual(factoryPokemon.pokemon.spDefense, factoryPokemon.group, factoryPokemon.pokemon.spDefense, level, calculateNatureEffects(factoryPokemon.nature, 'spDefense')),
        speed: calculateActual(factoryPokemon.pokemon.speed, factoryPokemon.group, factoryPokemon.pokemon.speed, level, calculateNatureEffects(factoryPokemon.nature, 'speed')),
      }
    },
  },
});

export const { setDefender } = defenderSlice.actions;
export default defenderSlice.reducer;
