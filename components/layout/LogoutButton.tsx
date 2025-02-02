'use client'

import React from 'react'
import { useClerk } from "@clerk/nextjs"
import { LogOut } from "lucide-react"
import { Button } from "../../components/ui/button"
import { useRouter } from "next/navigation"

export function LogoutButton() {
	const { signOut } = useClerk()
	const router = useRouter()

	const handleSignOut = async () => {
		await signOut()
		router.push('/')
		router.refresh()
	}

	return (
		<Button 
			variant="ghost" 
			size="icon"
			onClick={handleSignOut}
			aria-label="Sign out"
		>
			<LogOut className="h-5 w-5" />
		</Button>
	)
}