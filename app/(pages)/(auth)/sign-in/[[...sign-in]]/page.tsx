"use client"

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <SignIn 
                redirectUrl="/engine"
                afterSignUpUrl="/engine"
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
