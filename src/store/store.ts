import { configureStore } from '@reduxjs/toolkit';
import attackerReducer from './slices/attackerSlice';
import defenderReducer from './slices/defenderSlice';

export const store = configureStore({
  reducer: {
    attacker: attackerReducer,
    defender: defenderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
