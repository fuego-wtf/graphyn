'use client'

import { SignIn } from "@clerk/nextjs"
import { ThemeProvider } from "next-themes"

export default function SignInPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex h-screen items-center justify-center">
        <SignIn path="/sign-in" routing="path" />
      </div>
    </ThemeProvider>
  )
} 