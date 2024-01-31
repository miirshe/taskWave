import { createSlice } from '@reduxjs/toolkit';

const bordColorSlices = createSlice({
    name: 'boardColor',
    initialState : {
        boardColor : '#ffffff',
        textColor : '#42526E'
    },
    reducers : {
        handleColorBoard : (state , action) => {
            const { boardColor , textColor } = action.payload;
            state.boardColor = boardColor;
            state.textColor = textColor;
        }
    }
})

export const {
    handleColorBoard
} = bordColorSlices.actions;

export default bordColorSlices.reducer;