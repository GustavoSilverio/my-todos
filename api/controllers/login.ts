import { UserReq } from "@/models/user"
import { User } from "@prisma/client"
import { useMutation } from "react-query"
import { api } from "../services/axios"
import { CustomError } from "@/models/error"

export const useLogin = () => {
    return useMutation<User, CustomError, UserReq>({
        mutationFn: async (user) => {
            const { data } = await api.post<User>("/login", user)
            return data
        }
    })
}
