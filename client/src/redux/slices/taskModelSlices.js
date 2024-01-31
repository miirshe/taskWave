import { createSlice } from '@reduxjs/toolkit'
const taskModelSlices = createSlice({
    name: 'taskModel',
    initialState: {
        taskModel: false
    },
    reducers: {
        handleOpenTaskModel: (state, action) => {
            state.taskModel = action.payload;
        },
        handleCloseTaskModel: (state, action) => {
            state.taskModel = action.payload;
        }
    }
})

export const {
    handleOpenTaskModel,
    handleCloseTaskModel
} = taskModelSlices.actions;

export default taskModelSlices.reducer;