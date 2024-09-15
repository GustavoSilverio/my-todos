import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Header } from "@/components/header"

const inter = Inter({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
	title: "my-todos",
	description: "A simple todo app",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR">
			<body className={inter.className}>
				<Providers>
					<Header />
					<main className="h-[calc(100dvh-105px)] w-full flex items-center justify-center px-4">
						{children}
					</main>
				</Providers>
			</body>
		</html>
	)
}
