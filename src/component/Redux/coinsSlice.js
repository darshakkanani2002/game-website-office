// redux/coinsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const coinsSlice = createSlice({
    name: 'coins',
    initialState: {
        value: 0,
    },
    reducers: {
        setCoins: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setCoins } = coinsSlice.actions;
export default coinsSlice.reducer;
