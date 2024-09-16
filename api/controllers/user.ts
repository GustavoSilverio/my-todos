import { useMutation } from "react-query"
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