"use client"

import { useAddTodo, useGetTodosByUserId } from "@/api/controllers/todo";
import { TodoItem } from "@/components/todo-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore";
import { useToast } from "@/hooks/use-toast";

export default function Todo() {

	const { userId } = useAuthStore()

	const { toast } = useToast()

	const router = useRouter()

	const {
		data: todos,
		isLoading: isLoadingTodos,
		isFetching: isFetchingTodos,
	} = useGetTodosByUserId(userId as number)

	const {
		mutateAsync: addTodo,
		isLoading: isLoadingAddTodo,
	} = useAddTodo()

	const [title, setTitle] = useState("");

	const handleAddTodo = async () => {
		if (!title)
			toast({
				title: "Error",
				description: "Please enter a title for the todo.",
				variant: "destructive",
			})
		else
			await addTodo({ title, userId: userId as number }).then(() => setTitle(""))
	}

	const handleExit = () => {
		router.push("/")
	}

	return (
		<div className="flex flex-col gap-3 p-[10px] w-full max-w-[609px]">
			<div className="flex gap-3 flex-col">
				<div className="flex items-center gap-2">
					<button
						onClick={handleExit}
					>
						<ArrowLeft color="#F8FAFC" />
					</button>

					<h1
						className="text-3xl font-bold"
					>
						my-todos ✅
					</h1>
				</div>

				<div className="flex flex-col gap-3 w-full">
					<form
						className="flex w-full gap-3"
						onSubmit={(e) => {
							e.preventDefault()
							handleAddTodo()
						}}
					>
						<Input
							type="text"
							placeholder="Buy more milk..."
							className="bg-slate-900 border-none"
							onChange={(e) => setTitle(e.target.value)}
							value={title}
							disabled={isFetchingTodos || isLoadingAddTodo}
						/>

						<Button
							className="w-[51px] p-0 bg-slate-900 border-none"
							type="submit"
							variant="secondary"
							disabled={isFetchingTodos || isLoadingAddTodo}
						>
							<Plus color="#F8FAFC" />
						</Button>
					</form>

					<div className="flex h-[168px] flex-col gap-3 overflow-y-auto">
						{isLoadingTodos ? (
							<>
								{Array.from({ length: 5 }).map((_, index) => (
									<Skeleton
										className="w-full h-6"
										key={index}
									/>
								))}
							</>
						) : (
							todos && todos.length > 0 ? (
								todos.map((todo) => (
									<TodoItem
										key={todo.id}
										isDone={todo.done}
										{...todo}
									/>
								))
							) : (
								<p className="text-center text-slate-400">
									no todos found :(
								</p>
							)
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
