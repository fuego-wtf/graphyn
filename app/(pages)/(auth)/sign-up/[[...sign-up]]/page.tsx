"use client"

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<SignUp 
				redirectUrl="/engine"
				appearance={{
					elements: {
						rootBox: "mx-auto",
						card: "rounded-lg shadow-md"
					}
				}}
			/>
		</div>
	);
}