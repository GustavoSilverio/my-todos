export interface Todo {
    id: number
    title: string
    done: boolean
    userId: number
}

export interface TodoReq {
    title: string
    userId: number
}

export interface UpdateTodoReq {
    id: number
    done: boolean
}