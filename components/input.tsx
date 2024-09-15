"use client"

import { Label } from "./ui/label"
import { Input as InputUI } from "./ui/input"
import { Button } from "./ui/button"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

interface InputProps {
	label: string
	placeholder: string
	name: string
	type?: "text" | "password"
	value: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({
	label,
	type = "text",
	value,
	onChange,
	...props
}: InputProps) => {
	const [showPassword, setShowPassword] = useState(false)

	return (
		<div className="flex flex-col gap-2">
			<Label className="text-sm font-medium">{label}</Label>

			{type === "password" ? (
				<div className="relative">
					<InputUI
						{...props}
						type={showPassword ? "text" : "password"}
						value={value}
						onChange={onChange}
					/>

					{showPassword ? (
						<Eye
							className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
							onClick={() => setShowPassword(!showPassword)}
						/>
					) : (
						<EyeOff
							className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
							onClick={() => setShowPassword(!showPassword)}
						/>
					)}
				</div>
			) : (
				<InputUI
					{...props}
					type={type}
					value={value}
					onChange={onChange}
				/>
			)}
		</div>
	)
}
