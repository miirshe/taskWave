import { createSlice } from '@reduxjs/toolkit';

const bordColorSlices = createSlice({
    name: 'boardColor',
    initialState: {
        boardColor: localStorage.getItem('boardColor')
            ? JSON.parse(localStorage.getItem('boardColor'))
            : '#ffffff',
        textColor: localStorage.getItem('textColor')
            ? JSON.parse(localStorage.getItem('textColor'))
            : '#42526E',
    },
    reducers: {
        handleColorBoard: (state, action) => {
            const { boardColor, textColor } = action.payload;
            state.boardColor = boardColor;
            state.textColor = textColor;
            localStorage.setItem('boardColor', JSON.stringify(state.boardColor));
            localStorage.setItem('textColor', JSON.stringify(state.textColor));
        },
    },
});

export const { handleColorBoard } = bordColorSlices.actions;

export default bordColorSlices.reducer;
