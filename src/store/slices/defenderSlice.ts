import { Defender } from '@/types/defender';
import { createSlice } from '@reduxjs/toolkit';
import { initialDefender } from '../initialPokemons';

const initialState: Defender = {
  factoryPokemon: initialDefender,
  iv: 0,
  ability: initialDefender.pokemon.ability1,
  item: initialDefender.item,
  bRank: 0,
  dRank: 0,
};

const defenderSlice = createSlice({
  name: 'defender',
  initialState,
  reducers: {
    setDefender: (state, action) => {
      const factoryPokemon = action.payload.pokemon;
      state.factoryPokemon = factoryPokemon;
      state.ability = factoryPokemon.ability1;
      state.iv = action.payload.iv;
      state.item = factoryPokemon.item;
      state.bRank = 0;
      state.dRank = 0;
    },
    setBRank: (state, action) => {
      state.bRank = action.payload.rank;
    },
    setDfIv: (state, action) => {
      state.iv = action.payload;
    },
    setDRank: (state, action) => {
      state.dRank = action.payload.rank;
    },
    setDfAbility: (state, action) => {
      state.ability = action.payload.ability;
    },
    setDfItem: (state, action) => {
      state.item = action.payload.item;
    },
  },
});

export const {
  setDefender,
  setBRank,
  setDRank,
  setDfAbility,
  setDfItem,
  setDfIv,
} = defenderSlice.actions;
export default defenderSlice.reducer;
