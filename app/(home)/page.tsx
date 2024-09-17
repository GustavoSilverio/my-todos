"use client"

import { useLogin } from "@/api/controllers/login"
import { useRegister } from "@/api/controllers/user"
import { Input } from "@/components/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useAuthStore } from "@/lib/stores/authStore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Home() {

	const {
		mutateAsync: login,
		isLoading: isLoadingLogin,
		isError: isErrorLogin,
	} = useLogin()

	const {
		mutateAsync: register,
		isLoading: isLoadingRegister,
		isError: isErrorRegister,
		error: errorRegister,
	} = useRegister()

	const { toast } = useToast()

	const { setUserId } = useAuthStore()

	const [name, setName] = useState("")
	const [password, setPassword] = useState("")
	const [entranceType, setEntranceType] = useState<"login" | "register">(
		"login"
	)

	const router = useRouter()

	const handleEntrance = async () => {
		if (!name || !password) {
			toast({
				title: "Error",
				description: "Please enter your name and password.",
				variant: "destructive",
			})
			return
		}

		if (entranceType === "login")
			await login({ name, password }).then((user) => {
				setUserId(user.id)
				router.push("/todo")
			})
		else
			await register({ name, password }).then((user) => {
				setUserId(user.id)
				router.push("/todo")
			})
	}

	useEffect(() => {
		if (isErrorLogin)
			toast({
				title: "Login failed",
				description: "Verify your credentials and try again.",
				variant: "destructive",
			})
	}, [isErrorLogin, toast])

	useEffect(() => {
		if (isErrorRegister) {
			console.log(errorRegister)
			if (errorRegister.response?.data.type === "short-password")
				toast({
					title: "Password too short",
					description: "Password must be at least 6 characters long.",
					variant: "destructive",
				})
			else
				toast({
					title: "Error",
					description: "Some error occurred, try again later.",
					variant: "destructive",
				})
		}
	}, [isErrorRegister, toast, errorRegister])

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
