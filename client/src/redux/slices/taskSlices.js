import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { BASE_URL } from "../Base_url";
const getToken = () => {
    return Cookies.get('userToken');
}
export const taskSlices = createApi({
    reducerPath: 'taskSlices',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const token = getToken();
            if (token) {
                headers.set('Authorization', token);
            }
            return headers;
        }
    }),
    tagTypes: ['task'],
    endpoints: (builder) => ({
        createTask: builder.mutation({
            query: (newTask) => ({
                url: 'task/create',
                method: 'POST',
                body: newTask
            }),
            invalidatesTags: ['task']
        }),

        updateTask: builder.mutation({
            query: ({ id, updateTask }) => ({
                url: `task/${id}`,
                method: 'PUT',
                body: updateTask
            }),
            invalidatesTags: ['task']
        }),


        deleteTask: builder.mutation({
            query: (id) => ({
                url: `task/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['task']
        }),

        getCurrentTask: builder.query({
            query: () => {
                return {
                    url: 'tasks',
                    method: 'GET',
                }
            },
            providesTags: ['task']
        })
    })
})


export const {
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useGetCurrentTaskQuery
} = taskSlices;