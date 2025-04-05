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
      state.factoryPokemon = action.payload;
    },
  },
});

export const { setDefender } = defenderSlice.actions;
export default defenderSlice.reducer;
