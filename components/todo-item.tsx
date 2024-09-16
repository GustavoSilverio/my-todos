"use client"

import { useDeleteTodo, useUpdateTodo } from "@/api/controllers/todo"
import { Check, X } from "lucide-react"

interface TodoItemProps {
    id: number
    title: string
    isDone: boolean
}

export const TodoItem = ({
    id,
    title,
    isDone,
}: TodoItemProps) => {

    const {
        mutateAsync: deleteTodo,
    } = useDeleteTodo()

    const {
        mutateAsync: updateTodo,
    } = useUpdateTodo()

    const handleDeleteTodo = async (id: number) => {
        await deleteTodo(id)
    }

    const handleUpdateTodo = async (id: number) => {
        await updateTodo({ id, done: !isDone })
    }

    return (
        <div className="flex justify-between items-center">
            <p
                className={`${isDone ? "line-through" : undefined}`}
            >
                {title}
            </p>

            <div className="flex gap-1">
                <button
                    onClick={() => handleUpdateTodo(id)}
                >
                    <Check color="#F8FAFC" />
                </button>

                <button
                    onClick={() => handleDeleteTodo(id)}
                >
                    <X color="#F8FAFC" />
                </button>
            </div>
        </div>
    )
}