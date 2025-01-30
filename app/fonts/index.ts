import localFont from 'next/font/local'

export const geistSans = localFont({
	src: './GeistVF.woff',
	variable: '--font-sans',
	display: 'swap',
})

export const geistMono = localFont({
	src: './GeistMonoVF.woff',
	variable: '--font-mono',
	display: 'swap',
})