"use client"

import { QueryClientProvider } from "react-query"
import { ThemeProvider } from "./theme-provider"
import { queryClient } from "@/api/services/query-client"
import { ReactQueryDevtools } from 'react-query/devtools'

export const Providers = ({ children }: React.PropsWithChildren) => {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider
				attribute="class"
				defaultTheme="dark"
				enableSystem
			>
				{children}

				{process.env.NODE_ENV === "development" &&
					<ReactQueryDevtools />
				}
			</ThemeProvider>
		</QueryClientProvider>
	)
}
