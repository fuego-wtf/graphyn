"use client"

import { UserProfile } from "@clerk/nextjs";

export default function UserProfilePage() {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<UserProfile 
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