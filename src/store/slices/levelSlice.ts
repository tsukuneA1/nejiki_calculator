import { createSlice } from "@reduxjs/toolkit";

export const levelSlice = createSlice({
    name: 'level',
    initialState: 100,
    reducers: {
        setLevel: (state, action) => {
            return action.payload;
        }
    }
})

export const { setLevel } = levelSlice.actions;

export default levelSlice.reducer;
