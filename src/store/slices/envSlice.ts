import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  weather: 'なし',
  reflect: false,
  lightScreen: false,
};

export const envSlice = createSlice({
  name: 'env',
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
  },
});

export const { setWeather, setReflect, setLightScreen } = envSlice.actions;
export default envSlice.reducer;
