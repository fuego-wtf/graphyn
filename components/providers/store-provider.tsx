'use client'

import { useRef, useEffect } from 'react'
import { useAgentStore } from '@/store/agent'

export function StoreProvider({ children }: { children: React.ReactNode }) {
	const initialized = useRef(false)
	
	useEffect(() => {
		if (!initialized.current) {
			initialized.current = true
			useAgentStore.setState({ agents: [] })
		}
	}, [])

	return children
}