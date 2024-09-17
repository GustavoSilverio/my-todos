import { Todo, TodoReq, UpdateTodoReq } from "@/models/todo"
import { useMutation, useQuery } from "react-query"
import { api } from "../services/axios"
import { queryClient } from "../services/query-client"
import { CustomError } from "@/models/error"

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
    return useMutation<Todo, CustomError, TodoReq>({
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
    return useMutation<void, CustomError, number>({
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
    return useMutation<void, CustomError, UpdateTodoReq>({
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