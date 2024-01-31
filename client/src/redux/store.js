import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import SidebarMenuSlice from "./slices/SidebarMenuSlice";
import { UserSlices } from "./slices/UserSlices";
import popUpSlices from "./slices/popUpSlices";
import { boardSlices } from "./slices/boardSlices";
import bordColorSlices from "./slices/bordColorSlices";
import { taskSlices } from "./slices/taskslices";
import taskModelSlices from "./slices/taskModelSlices";

export const store = configureStore({
    reducer : {
        sidebar : SidebarMenuSlice,
        popUp : popUpSlices,
        boardColor : bordColorSlices,
        taskModel : taskModelSlices,
        [UserSlices.reducerPath]:UserSlices.reducer,
        [boardSlices.reducerPath]:boardSlices.reducer,
        [taskSlices.reducerPath]:taskSlices.reducer,
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(UserSlices.middleware)
    .concat(boardSlices.middleware)
    .concat(taskSlices.middleware)
})
setupListeners(store.dispatch)