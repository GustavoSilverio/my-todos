"use client"

import { TodoItem } from "@/components/todo-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Todo as TodoT } from "@/models/todo";
import { Plus } from "lucide-react";
import { Suspense, use } from "react";

const TodosList = async () => {

	// const todos = use(
	// 	await fetch("/api/todo?userId=1", {
	// 		method: "GET",
	// 	}).then(res => res.json())
	// ) as TodoT[]

	return (
		<div className="flex h-[168px] flex-col gap-3 overflow-y-auto">
			{/* {todos.map((todo) => (
				<TodoItem
					key={todo.id}
					{...todo}
					isDone={todo.done}
					onCheck={() => console.log("check")}
					onDelete={() => console.log("delete")}
				/>
			))} */}
		</div>
	)
}

export default function Todo() {
	return (
		<div className="flex flex-col gap-[10px] p-[10px] w-full max-w-[609px]">
			<div className="flex gap-2 flex-col">
				<h1
					className="text-3xl font-bold"
				>
					my-todos ✅
				</h1>

				<div className="flex flex-col gap-2 w-full">
					<div className="flex w-full gap-2">
						<Input
							type="text"
							placeholder="Buy more milk..."
							className="bg-slate-900 border-none"
						/>

						<Button
							className="w-[51px] p-0 bg-slate-900 border-none"
							variant="secondary"
						>
							<Plus color="#F8FAFC" />
						</Button>
					</div>

					<Suspense
						fallback={
							<div className="flex justify-center items-center">
								<p>Loading...</p>
							</div>
						}
					>
						<TodosList />
					</Suspense>
				</div>
			</div>
		</div>
	)
}
