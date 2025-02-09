'use client'

import { SignUp } from "@clerk/nextjs"
import { ThemeProvider } from "next-themes"

export default function SignUpPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex h-screen items-center justify-center">
        <SignUp path="/sign-up" routing="path" />
      </div>
    </ThemeProvider>
  )
} 