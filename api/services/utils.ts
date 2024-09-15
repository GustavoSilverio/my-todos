import { NextResponse } from "next/server"

export const ResponseException = (message: string) => {
	return NextResponse.json(
		{
			message,
		},
		{ status: 400 }
	)
}

export const ResponseTypeException = (message: string, type: string) => {
	return NextResponse.json(
		{
			message,
			type,
		},
		{ status: 400 }
	)
}
