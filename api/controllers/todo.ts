import { Todo, TodoReq, UpdateTodoReq } from "@/models/todo"
import { useMutation, useQuery } from "react-query"
import { api } from "../services/axios"
import { queryClient } from "../services/query-client"

export const useGetTodosByUserId = (userId: number) => {
    return useQuery<Todo[]>({
        queryKey: ["todos", userId],
        queryFn: async () => {
            const { data } = await api.get<Todo[]>(
                "/todo",
                {
                    params: {
                        userId,
                    },
                }
            )

            return data
        },
    })
}

export const useAddTodo = () => {
    return useMutation<Todo, Error, TodoReq>({
        mutationFn: async (todo) => {
            const { data } = await api.post<Todo>("/todo", todo)
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] })
        },
    })
}

export const useDeleteTodo = () => {
    return useMutation<void, Error, number>({
        mutationFn: async (id) => {
            await api.delete("/todo", {
                params: {
                    id,
                },
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] })
        },
    })
}

export const useUpdateTodo = () => {
    return useMutation<void, Error, UpdateTodoReq>({
        mutationFn: async ({ id, done }) => {
            await api.put("/todo", {
                id,
                done,
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] })
        },
    })
}