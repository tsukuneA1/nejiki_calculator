import { Attacker } from '@/types/attacker';
import { createSlice } from '@reduxjs/toolkit';

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

const attackerSlice = createSlice({
  name: 'attacker',
  initialState,
  reducers: {
    setAttacker: (state, action) => {
      state[0] = action.payload;
    },
    setMove: (state, action) => {
      state[0].move = action.payload;
    },
  },
});

export const { setAttacker } = attackerSlice.actions;
export default attackerSlice.reducer;
