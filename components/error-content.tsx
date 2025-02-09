"use client"; // marks this as a client component

type ErrorContentProps = {
	error: Error;
	reset: () => void;
};

export default function ErrorContent({ error, reset }: ErrorContentProps) {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-4">
			<h1>something went wrong!</h1>
			<p>{error.message}</p>
			{/* reset button required for interactive errors after hydration */}
			<button onClick={reset} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
				try again
			</button>
		</div>
	);
} 