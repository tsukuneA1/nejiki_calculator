import {
  calculateActual,
  calculateHActual,
} from '@/functions/calculate_actual';
import { calculateNatureEffects } from '@/functions/calculate_natureEffects';
import { calculateStatus } from '@/functions/calculate_status';
import { Attacker } from '@/types/attacker';
import { FactoryPokemon } from '@/types/factoryPokemon';
import { Move } from '@/types/move';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const initialState: Attacker[] = [
  {
    factoryPokemon: null,
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
    },
    setMove: (state, action: PayloadAction<{ move: Move; pos: number }>) => {
      state[action.payload.pos].move = action.payload.move;
    },
  },
});

export const { setAttacker, setMove } = attackerSlice.actions;
export default attackerSlice.reducer;
