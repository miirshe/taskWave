import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { BASE_URL } from "../Base_url";
const getToken = () => {
    return Cookies.get('userToken');
}
export const boardSlices = createApi({
    reducerPath: 'boardSlices',
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
    tagTypes: ['board'],
    endpoints: (builder) => ({
        createBoard: builder.mutation({
            query: (newBoard) => ({
                url: 'board/create',
                method: 'POST',
                body: newBoard
            }),
            invalidatesTags: ['board']
        }),

        updateBoard: builder.mutation({
            query: ({ id, updateBoard }) => ({
                url: `board/${id}`,
                method: 'PUT',
                body: updateBoard
            }),
            invalidatesTags: ['board']
        }),


        deleteBoard: builder.mutation({
            query: (id) => ({
                url: `board/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['board']
        }),

        getCurrentBoard: builder.query({
            query: () => {
                return {
                    url: 'boards',
                    method: 'GET',
                }
            },
            providesTags: ['board']
        })
    })
})


export const {
    useCreateBoardMutation,
    useUpdateBoardMutation,
    useDeleteBoardMutation,
    useGetCurrentBoardQuery
} = boardSlices;