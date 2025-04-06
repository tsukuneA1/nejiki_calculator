import { configureStore } from '@reduxjs/toolkit';
import attackerReducer from './slices/attackerSlice';
import defenderReducer from './slices/defenderSlice';
import levelReducer from './slices/levelSlice';
export const store = configureStore({
  reducer: {
    attacker: attackerReducer,
    defender: defenderReducer,
    level: levelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
