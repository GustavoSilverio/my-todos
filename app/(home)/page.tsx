"use client"

import { useLogin } from "@/api/controllers/login"
import { useRegister } from "@/api/controllers/user"
import { Input } from "@/components/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Home() {

	const {
		mutateAsync: login,
		isLoading: isLoadingLogin,
	} = useLogin()

	const {
		mutateAsync: register,
		isLoading: isLoadingRegister,
	} = useRegister()

	const [name, setName] = useState("")
	const [password, setPassword] = useState("")
	const [entranceType, setEntranceType] = useState<"login" | "register">(
		"login"
	)

	const router = useRouter()

	const handleEntrance = async () => {
		if (entranceType === "login")
			await login({ name, password }).then((user) => localStorage.setItem("userId", user.id.toString()))
		else
			await register({ name, password }).then((user) => localStorage.setItem("userId", user.id.toString()))

		router.push("/todo")
	}

	return (
		<div className="flex flex-col gap-3 p-[10px] w-full max-w-[340px]">
			<div className="flex flex-col gap-2">
				<h2 className="text-2xl font-bold">
					{entranceType === "login" ? "Sign in" : "Sign up"} 🔑
				</h2>

				<p className="text-sm text-slate-200">
					Just enter in the platform.
				</p>
			</div>

			<div className="flex flex-col gap-4">
				<Input
					label="Name"
					placeholder="Pacman the eater"
					name="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<Input
					label="Password"
					placeholder="pacman123"
					name="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>

			<Button
				variant="secondary"
				onClick={handleEntrance}
				disabled={isLoadingLogin || isLoadingRegister}
			>
				{isLoadingLogin || isLoadingRegister
					? "loading..."
					: entranceType === "login"
						? "sign in"
						: "sign up"}
			</Button>

			<p className="text-sm text-slate-200">
				{entranceType === "login"
					? "Don't have an account?"
					: "Already have an account?"}{" "}
				<span
					className="text-primary underline underline-offset-4 cursor-pointer"
					onClick={() =>
						setEntranceType((old) =>
							old === "login" ? "register" : "login"
						)
					}
				>
					{entranceType === "login" ? "Sign up" : "Sign in"}
				</span>
			</p>
		</div>
	)
}
