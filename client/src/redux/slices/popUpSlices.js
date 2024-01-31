import { createSlice } from '@reduxjs/toolkit'
const popUpSlices = createSlice({
    name: 'popUp',
    initialState: {
        popUp: false
    },
    reducers: {
        handleOpen: (state, action) => {
            state.popUp = action.payload;
        },
        handleClose: (state, action) => {
            state.popUp = action.payload;
        }
    }
})

export const {
    handleOpen,
    handleClose,
} = popUpSlices.actions;

export default popUpSlices.reducer;