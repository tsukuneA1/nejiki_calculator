import { Attacker } from '@/types/attacker';
import { FactoryPokemon } from '@/types/factoryPokemon';
import { Move } from '@/types/move';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialAttacker } from '../initialPokemons';

const initialState: Attacker[] = [
  {
    factoryPokemon: initialAttacker,
    iv: 0,
    ability: initialAttacker.pokemon.ability1,
    item: initialAttacker.item,
    attackRank: 0,
    move: initialAttacker.moves[0],
    criticalHit: false,
    burned: false,
    rank: 0,
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
    addAttacker: (state, action: PayloadAction<{pokemon:FactoryPokemon, iv: number}>) => {
      const pokemon = action.payload.pokemon;
      state.push({
        factoryPokemon: pokemon,
        iv: action.payload.iv,
        ability: pokemon.pokemon.ability1,
        item: pokemon.item,
        attackRank: 0,
        move: pokemon.moves[0],
        criticalHit: false,
        burned: false,
        rank: 0,
      });
    },
    deleteAttacker: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
    },
    clearAttacker: (state) => {
      state.length = 1;
    },
    setIv: (state, action: PayloadAction<{ iv: number, pos: number}>) => {
      state[action.payload.pos].iv = action.payload.iv;
    },
    setAttacker: (state, action: PayloadAction<AttackerState>) => {
      const factoryPokemon = action.payload.pokemon;
      state[action.payload.pos].factoryPokemon = factoryPokemon;
      state[action.payload.pos].ability = factoryPokemon.pokemon.ability1;
      state[action.payload.pos].item = factoryPokemon.item;
      state[action.payload.pos].attackRank = 0;
      state[action.payload.pos].move = factoryPokemon.moves[0];
    },
    setMove: (state, action: PayloadAction<{ move: Move; pos: number }>) => {
      state[action.payload.pos].move = action.payload.move;
    },
    setRank: (state, action: PayloadAction<{ rank: number; pos: number }>) => {
      state[action.payload.pos].rank = action.payload.rank;
    },
    setAbility: (
      state,
      action: PayloadAction<{ ability: string; pos: number }>
    ) => {
      state[action.payload.pos].ability = action.payload.ability;
    },
    setItem: (state, action: PayloadAction<{ item: string; pos: number }>) => {
      state[action.payload.pos].item = action.payload.item;
    },
    setCriticalHit: (
      state,
      action: PayloadAction<{ isCritical: boolean; pos: number }>
    ) => {
      state[action.payload.pos].criticalHit = action.payload.isCritical;
    },
    setBurned: (
      state,
      action: PayloadAction<{ isBurned: boolean; pos: number }>
    ) => {
      state[action.payload.pos].burned = action.payload.isBurned;
    },
  },
});

export const {
  setAttacker,
  setMove,
  setRank,
  setAbility,
  setItem,
  addAttacker,
  deleteAttacker,
  clearAttacker,
  setCriticalHit,
  setBurned,
} = attackerSlice.actions;
export default attackerSlice.reducer;
