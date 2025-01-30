'use client'

import { useState } from "react"
import { useConversation } from "./conversation-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Brain, Plus, Search, Edit2, Check, X } from 'lucide-react'

export function MemoryPanel() {
	const { memories, addMemory, updateMemory } = useConversation()
	const [searchTerm, setSearchTerm] = useState("")
	const [editingIndex, setEditingIndex] = useState<number | null>(null)
	const [editingText, setEditingText] = useState("")

	const filteredMemories = memories.filter(memory => 
		memory.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const handleEdit = (index: number) => {
		setEditingIndex(index)
		setEditingText(memories[index])
	}

	const handleSave = (index: number) => {
		updateMemory(index, editingText)
		setEditingIndex(null)
	}

	return (
		<div className="h-full flex flex-col">
			<div className="p-4 border-b">
				<h2 className="font-semibold flex items-center gap-2">
					<Brain className="size-4" />
					Memory Store
				</h2>
			</div>
			<div className="p-4 flex-1 overflow-auto">
				<div className="flex gap-2 mb-4">
					<Input 
						placeholder="Search memories..." 
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<Button variant="ghost" size="icon">
						<Search className="size-4" />
					</Button>
				</div>
				{filteredMemories.map((memory, i) => (
					<div key={i} className="mb-2">
						{editingIndex === i ? (
							<div className="flex gap-2">
								<Input
									value={editingText}
									onChange={(e) => setEditingText(e.target.value)}
									className="flex-1"
								/>
								<Button size="icon" variant="ghost" onClick={() => handleSave(i)}>
									<Check className="size-4" />
								</Button>
								<Button size="icon" variant="ghost" onClick={() => setEditingIndex(null)}>
									<X className="size-4" />
								</Button>
							</div>
						) : (
							<div className="p-2 bg-background rounded-lg text-sm flex items-center justify-between group">
								<span>{memory}</span>
								<Button
									size="icon"
									variant="ghost"
									className="opacity-0 group-hover:opacity-100 transition-opacity"
									onClick={() => handleEdit(i)}
								>
									<Edit2 className="size-4" />
								</Button>
							</div>
						)}
					</div>
				))}
			</div>
			<div className="p-4 border-t">
				<Button 
					variant="outline" 
					size="sm" 
					className="w-full"
					onClick={() => addMemory("New memory point...")}
				>
					<Plus className="size-4 mr-2" />
					Add Memory
				</Button>
			</div>
		</div>
	)
}