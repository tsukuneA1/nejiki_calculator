import { createSlice } from "@reduxjs/toolkit";

interface LevelState {
    level: number;
    times: number;
}

export const levelSlice = createSlice({
    name: 'level',
    initialState: {
        level: 100,
        times: 1,
    },
    reducers: {
        setLevel: (state, action) => {
            state.level = action.payload;
        },
        setTimes: (state, action) => {
            state.times = action.payload;
        },
    }
})

export const { setLevel, setTimes } = levelSlice.actions;

export default levelSlice.reducer;
