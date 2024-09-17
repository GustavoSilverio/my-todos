import { prisma } from "@/api/services/prisma";
import { Todo } from "@/models/todo";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("userId")

    if (!userId) {
        return NextResponse.json({ error: "userId is required" }, { status: 400 })
    }

    const todos = await prisma.todo.findMany({
        where: {
            userId: Number(userId),
        },
        orderBy: {
            createdAt: "desc",
        }
    })

    return NextResponse.json(todos)
}

export async function POST(request: Request) {
    const { title, userId } = await request.json() as Todo

    if (!title || !userId) {
        return NextResponse.json({ error: "title and userId are required" }, { status: 400 })
    }

    const todo = await prisma.todo.create({
        data: {
            title,
            userId: Number(userId),
        }
    })

    return NextResponse.json(todo)
}

export async function PUT(request: Request) {
    const { id, done } = await request.json() as Todo

    if (!id || typeof done !== "boolean") {
        return NextResponse.json({ error: "id and done are required" }, { status: 400 })
    }

    const todo = await prisma.todo.update({
        where: { id },
        data: {
            done,
        }
    })

    return NextResponse.json(todo)
}

export async function DELETE(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get("id")

    if (!id) {
        return NextResponse.json({ error: "id is required" }, { status: 400 })
    }

    const todo = await prisma.todo.delete({
        where: { id: Number(id) }
    })

    return NextResponse.json(todo)
}