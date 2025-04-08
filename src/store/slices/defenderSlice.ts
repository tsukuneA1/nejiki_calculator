import { Defender } from '@/types/defender';
import { createSlice } from '@reduxjs/toolkit';
import { initialDefender } from '../initialPokemons';

const initialState: Defender = {
  factoryPokemon: initialDefender,
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
      state.item = factoryPokemon.item;
      state.bRank = 0;
      state.dRank = 0;
    },
    setBRank: (state, action) => {
      state.bRank = action.payload.rank;
    },
    setDRank: (state, action) => {
      state.dRank = action.payload.rank;
    },
  },
});

export const { setDefender, setBRank, setDRank } = defenderSlice.actions;
export default defenderSlice.reducer;
