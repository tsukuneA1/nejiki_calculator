import type { Env } from "@/types/env";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Env = {
  weather: "なし",
  reflect: false,
  lightScreen: false,
  stealthRock: false,
  lifeOrb: false,
};

export const envSlice = createSlice({
  name: "env",
  initialState: initialState,
  reducers: {
    setWeather: (state, action) => {
      state.weather = action.payload;
    },
    setReflect: (state, action) => {
      state.reflect = action.payload;
    },
    setLightScreen: (state, action) => {
      state.lightScreen = action.payload;
    },
    setStealthRock: (state, action) => {
      state.stealthRock = action.payload;
    },
    setLifeOrb: (state, action) => {
      state.lifeOrb = action.payload;
    },
  },
});

export const {
  setWeather,
  setReflect,
  setLightScreen,
  setStealthRock,
  setLifeOrb,
} = envSlice.actions;
export default envSlice.reducer;
