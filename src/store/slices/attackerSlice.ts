import { calculateActual, calculateHActual } from '@/functions/calculate_actual';
import { calculateNatureEffects } from '@/functions/calculate_natureEffects';
import { Attacker } from '@/types/attacker';
import { FactoryPokemon } from '@/types/factoryPokemon';
import { Move } from '@/types/move';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Attacker[] = [
  {
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
    attackRank: 0,
    move: null,
    criticalHit: false,
    burned: false,
  },
];

type AttackerState = {
  pokemon: FactoryPokemon;
  pos: number;
};

const attackerSlice = createSlice({
  name: 'attacker',
  initialState,
  reducers: {
    setAttacker: (state, action: PayloadAction<AttackerState>) => {
      const factoryPokemon = action.payload.pokemon;
      state[action.payload.pos].factoryPokemon = factoryPokemon;
      state[action.payload.pos].ability = factoryPokemon.pokemon.ability1;
      state[action.payload.pos].item = factoryPokemon.item;
      state[action.payload.pos].attackRank = 0;
      state[action.payload.pos].move = factoryPokemon.moves[0];
      const level = 100;
      state[action.payload.pos].act = {
        hp: calculateHActual(factoryPokemon.pokemon.hp, factoryPokemon.group, factoryPokemon.pokemon.hp, level),
        attack: calculateActual(factoryPokemon.pokemon.attack, factoryPokemon.group, factoryPokemon.pokemon.attack, level, calculateNatureEffects(factoryPokemon.nature, 'attack')),
        defense: calculateActual(factoryPokemon.pokemon.defense, factoryPokemon.group, factoryPokemon.pokemon.defense, level, calculateNatureEffects(factoryPokemon.nature, 'defense')),
        spAttack: calculateActual(factoryPokemon.pokemon.spAttack, factoryPokemon.group, factoryPokemon.pokemon.spAttack, level, calculateNatureEffects(factoryPokemon.nature, 'spAttack')),
        spDefense: calculateActual(factoryPokemon.pokemon.spDefense, factoryPokemon.group, factoryPokemon.pokemon.spDefense, level, calculateNatureEffects(factoryPokemon.nature, 'spDefense')),
        speed: calculateActual(factoryPokemon.pokemon.speed, factoryPokemon.group, factoryPokemon.pokemon.speed, level, calculateNatureEffects(factoryPokemon.nature, 'speed')),
      }
    },
    setMove: (state, action: PayloadAction<{move: Move, pos: number}>) => {
      state[action.payload.pos].move = action.payload.move;
    },
  },
});

export const { setAttacker, setMove } = attackerSlice.actions;
export default attackerSlice.reducer;
