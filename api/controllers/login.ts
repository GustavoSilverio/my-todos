import { UserReq } from "@/models/user"
import { User } from "@prisma/client"
import { useMutation } from "react-query"
import { api } from "../services/axios"

export const useLogin = () => {
    return useMutation<User, Error, UserReq>({
        mutationFn: async (user) => {
            const { data } = await api.post<User>("/login", user)
            return data
        }
    })
}
