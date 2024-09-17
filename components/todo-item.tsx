"use client"

import { useDeleteTodo, useUpdateTodo } from "@/api/controllers/todo"
import { Check, X } from "lucide-react"
import { useState } from "react"

interface TodoItemProps {
    id: number
    title: string
    isDone: boolean
}

export const TodoItem = ({
    id,
    title,
    isDone: initialIsDone,
}: TodoItemProps) => {

    const [isDone, setIsDone] = useState(initialIsDone);

    const {
        mutateAsync: deleteTodo,
        isLoading: isLoadingDeleteTodo,
    } = useDeleteTodo()

    const {
        mutateAsync: updateTodo,
        isLoading: isLoadingUpdateTodo,
    } = useUpdateTodo()

    const handleDeleteTodo = async (id: number) => {
        await deleteTodo(id)
    }

    const handleUpdateTodo = async (id: number) => {
        setIsDone(!isDone)
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
                    disabled={isLoadingUpdateTodo || isLoadingDeleteTodo}
                >
                    <Check color="#F8FAFC" />
                </button>

                <button
                    onClick={() => handleDeleteTodo(id)}
                    disabled={isLoadingUpdateTodo || isLoadingDeleteTodo}
                >
                    <X color="#F8FAFC" />
                </button>
            </div>
        </div>
    )
}