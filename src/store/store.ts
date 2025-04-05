import { configureStore } from "@reduxjs/toolkit";

const initialState = {
    defender: {
        pokemon: null,
        ability: null,
        item: null,
        defenseRank: 0,
    },
    attackerList: [
        {
            pokemon: null,
            ability: null,
            item: null,
            attackRank: 0,
            move: null,
            criticalHit: false,
            burned: false,
        }
    ]
}

export const store = configureStore({
    reducer: {
        // counter: counterReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
