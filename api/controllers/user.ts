import { useMutation, useQuery } from "react-query"
import { api } from "../services/axios"
import { User, UserReq } from "@/models/user"

export const useRegister = () => {
    return useMutation<User, Error, UserReq>({
        mutationFn: async (user) => {
            const { data } = await api.post<User>("/user", user)
            return data
        }
    })
}

export const useGetUserById = (userId: number) => {
    return useQuery<User, Error>({
        queryKey: ["user", userId],
        queryFn: async () => {
            const { data } = await api.get<User>(
                '/user',
                {
                    params: {
                        id: userId
                    }
                }
            )
            return data
        }
    })
}