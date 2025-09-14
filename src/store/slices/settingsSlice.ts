import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "level",
  initialState: {
    level: 100,
    times: 1,
    isNejiki: false,
  },
  reducers: {
    setLevel: (state, action) => {
      state.level = action.payload;
    },
    setTimes: (state, action) => {
      state.times = action.payload;
    },
    setIsNejiki: (state, action) => {
      state.isNejiki = action.payload;
    },
  },
});

export const { setLevel, setTimes, setIsNejiki } = settingsSlice.actions;

export default settingsSlice.reducer;
