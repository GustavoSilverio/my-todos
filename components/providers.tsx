"use client"

import { ThemeProvider } from "./theme-provider"

export const Providers = ({ children }: React.PropsWithChildren) => {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="dark"
			enableSystem
		>
			{children}
		</ThemeProvider>
	)
}
