import { createSlice } from "@reduxjs/toolkit";

export const envSlice = createSlice({
  name: 'env',
  initialState: { env: 'normal' },
  reducers: {
    setEnv: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setEnv } = envSlice.actions;
export default envSlice.reducer;
