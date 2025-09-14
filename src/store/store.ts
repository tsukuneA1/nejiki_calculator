import { configureStore } from "@reduxjs/toolkit";
import attackerReducer from "./slices/attackerSlice";
import defenderReducer from "./slices/defenderSlice";
import envReducer from "./slices/envSlice";
import settingsReducer from "./slices/settingsSlice";

export const store = configureStore({
  reducer: {
    attacker: attackerReducer,
    defender: defenderReducer,
    settings: settingsReducer,
    env: envReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
