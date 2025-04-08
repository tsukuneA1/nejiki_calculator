import { Attacker } from '@/types/attacker';
import { FactoryPokemon } from '@/types/factoryPokemon';
import { Move } from '@/types/move';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialAttacker } from '../initialPokemons';

const initialState: Attacker[] = [
  {
    factoryPokemon: initialAttacker,
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
    addAttacker: (state, action: PayloadAction<FactoryPokemon>) => {
      state.push({
        factoryPokemon: action.payload,
        ability: action.payload.pokemon.ability1,
        item: action.payload.item,
        attackRank: 0,
        move: action.payload.moves[0],
        criticalHit: false,
        burned: false,
        rank: 0,
      });
    },
    deleteAttacker: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
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
  },
});

export const { setAttacker, setMove, setRank, addAttacker, deleteAttacker } =
  attackerSlice.actions;
export default attackerSlice.reducer;
