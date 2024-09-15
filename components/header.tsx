import Image from "next/image"

export const Header = () => {
	return (
		<header className="flex justify-start items-center px-6 py-8 sm:px-[140px]">
			<Image
				className=""
				src="/logo/logo.svg"
				alt="Logo"
				width={40}
				height={40}
			/>
		</header>
	)
}
