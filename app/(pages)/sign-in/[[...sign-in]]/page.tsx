'use client';

import * as React from "react";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<SignIn 
				appearance={{
					elements: {
						rootBox: "mx-auto w-full max-w-[440px]",
						card: "rounded-xl shadow-md p-8",
						headerTitle: "text-2xl font-semibold",
						formButtonPrimary: "bg-primary hover:bg-primary/90"
					}
				}}
			/>
		</div>
	);
}