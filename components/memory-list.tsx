"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

// Temporary mock data
const memories = [
	{
		id: "mem-001",
		content: "User prefers technical documentation",
		type: "Preference",
		lastAccessed: "2024-02-01T09:39:00Z",
	},
	{
		id: "mem-002",
		content: "Project requires graph database integration",
		type: "Requirement",
		lastAccessed: "2024-02-01T09:41:00Z",
	},
]

export function MemoryList() {
	const [searchTerm, setSearchTerm] = useState("")

	const filteredMemories = memories.filter(
		(memory) =>
			memory.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
			memory.type.toLowerCase().includes(searchTerm.toLowerCase()),
	)

	return (
		<div className="space-y-4 p-6">
			<div className="flex gap-2">
				<Input
					placeholder="Search memories"
					className="max-w-sm"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
			<div className="border rounded-lg">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[50px]">ID</TableHead>
							<TableHead>Content</TableHead>
							<TableHead className="w-[100px]">Type</TableHead>
							<TableHead className="w-[200px]">Last Accessed</TableHead>
							<TableHead className="w-[100px]"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredMemories.map((memory) => (
							<TableRow key={memory.id}>
								<TableCell className="font-mono text-xs">{memory.id}</TableCell>
								<TableCell>{memory.content}</TableCell>
								<TableCell>{memory.type}</TableCell>
								<TableCell>{new Date(memory.lastAccessed).toLocaleString()}</TableCell>
								<TableCell>
									<Button variant="secondary" size="sm" className="w-full">
										Edit
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}