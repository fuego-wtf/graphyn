'use client'

import { createContext, useContext, useState } from 'react'

type Segment = {
	speaker: string
	text: string
	sequence: number
}

type ConversationContextType = {
	segments: Segment[]
	memories: string[]
	addMemory: (memory: string) => void
	updateMemory: (index: number, memory: string) => void
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined)

export function ConversationProvider({ children }: { children: React.ReactNode }) {
	const [segments, setSegments] = useState<Segment[]>([])
	const [memories, setMemories] = useState<string[]>([])

	const addMemory = (memory: string) => {
		setMemories([...memories, memory])
	}

	const updateMemory = (index: number, memory: string) => {
		const newMemories = [...memories]
		newMemories[index] = memory
		setMemories(newMemories)
	}

	return (
		<ConversationContext.Provider value={{ segments, memories, addMemory, updateMemory }}>
			{children}
		</ConversationContext.Provider>
	)
}

export function useConversation() {
	const context = useContext(ConversationContext)
	if (!context) throw new Error('useConversation must be used within ConversationProvider')
	return context
}