'use client'

import React from 'react'
import { useClerk } from "@clerk/nextjs"
import { LogOut } from "lucide-react"
import { Button } from "../../components/ui/button"

export function LogoutButton() {
	const { signOut } = useClerk()

	return (
		<Button 
			variant="ghost" 
			size="icon"
			onClick={() => signOut()}
			aria-label="Sign out"
		>
			<LogOut className="h-5 w-5" />
		</Button>
	)
}