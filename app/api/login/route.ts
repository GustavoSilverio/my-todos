import { prisma } from "@/api/services/prisma"
import { ResponseTypeException } from "@/api/services/utils"
import { UserReq } from "@/models/user"
import { NextResponse } from "next/server"
import { User } from "@prisma/client"
import bcrypt from "bcrypt"

export async function POST(request: Request) {
	const { name, password } = (await request.json()) as UserReq

	const user = (await prisma.user.findUnique({
		where: {
			name,
		},
	})) as User

	if (!user) return ResponseTypeException("User not found", "user-not-found")

	const passwordMatch = await bcrypt.compare(password, user.password)

	if (!passwordMatch)
		return ResponseTypeException("Invalid password", "invalid-password")

	return NextResponse.json(user)
}
