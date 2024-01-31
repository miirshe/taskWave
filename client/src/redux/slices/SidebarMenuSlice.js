import { createSlice } from '@reduxjs/toolkit'
const sidebarMenuSlice = createSlice({
    name: 'sidebar',
    initialState: {
        isOpen: false
    }
    ,
    reducers: {
        openSidebar: (state,action) => {
            state.isOpen = action.payload;
        },
        closeSidebar: (state, action) => {
            state.isOpen = action.payload;
        }
    }
})
export default sidebarMenuSlice.reducer;

export const {
    openSidebar,
    closeSidebar
} = sidebarMenuSlice.actions;