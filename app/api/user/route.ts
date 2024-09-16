import { prisma } from "@/api/services/prisma"
import { ResponseTypeException } from "@/api/services/utils/exception"
import { User, UserReq } from "@/models/user"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

export async function GET() {
	const users = (await prisma.user.findMany()) as User[]

	return NextResponse.json(users)
}

export async function POST(request: Request) {
	const { name, password } = (await request.json()) as UserReq

	if (password.trim().length < 6)
		return ResponseTypeException(
			"Password must be at least 6 characters",
			"short-password"
		)

	const hashedPassword = await bcrypt.hash(password, 2) // 2 salt rounds

	const newUser = (await prisma.user.create({
		data: {
			name,
			password: hashedPassword,
		},
	})) as User

	return NextResponse.json(newUser, { status: 201 })
}

export async function DELETE(request: Request) {
	const { searchParams } = new URL(request.url)
	const name = searchParams.get("name")

	if (name) {
		await prisma.user.delete({
			where: {
				name,
			},
		})

		return NextResponse.json(
			{ message: `User ${name} deleted` },
			{ status: 200 }
		)
	} else {
		await prisma.user.deleteMany()
		return NextResponse.json(
			{ message: "All users deleted" },
			{ status: 200 }
		)
	}
}
