"use client"

import { Check, X } from "lucide-react"

interface TodoItemProps {
    id: number
    title: string
    isDone: boolean
    onCheck: (id: number) => void
    onDelete: (id: number) => void
}

export const TodoItem = ({
    id,
    title,
    isDone,
    onCheck,
    onDelete,
}: TodoItemProps) => {
    return (
        <div className="flex justify-between items-center">
            <p
                className={`${isDone ? "line-through" : undefined}`}
            >
                {title}
            </p>

            <div className="flex gap-1">
                <button
                    onClick={() => onCheck(id)}
                >
                    <Check color="#F8FAFC" />
                </button>

                <button
                    onClick={() => onDelete(id)}
                >
                    <X color="#F8FAFC" />
                </button>
            </div>
        </div>
    )
}