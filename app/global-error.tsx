"use client";

import Link from 'next/link'

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	return (
		<html>
			<body>
				<div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-4">
					<h1 className="text-4xl font-bold">something went wrong!</h1>
					<p className="text-muted-foreground">{error.message}</p>
					<div className="flex gap-4">
						<button
							onClick={() => reset()}
							className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-black/90"
						>
							try again
						</button>
						<Link
							href="/"
							className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-black/90"
						>
							return home
						</Link>
					</div>
				</div>
			</body>
		</html>
	)
}