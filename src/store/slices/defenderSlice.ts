import { Defender } from '@/types/defender';
import { createSlice } from '@reduxjs/toolkit';

const initialState: Defender = {
  factoryPokemon: null,
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
    },
  },
});

export const { setDefender } = defenderSlice.actions;
export default defenderSlice.reducer;
