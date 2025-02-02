'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bot, Search, MessageSquare, Database, Network, Brain } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

const tools = [
	{ name: "query_graph", icon: Database },
	{ name: "search_vectors", icon: Network },
	{ name: "process_memory", icon: Brain },
	{ name: "send_message", icon: MessageSquare },
]

export function ToolsPanel() {
	const [searchTerm, setSearchTerm] = useState("")
	const [expandedTools, setExpandedTools] = useState(true)

	const filteredTools = tools.filter(tool => 
		tool.name.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<h2 className="text-sm font-medium">TOOLS ({tools.length})</h2>
				<div className="flex gap-2">
					<Input 
						placeholder="Search tools" 
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<Button variant="ghost" size="icon">
						<Search className="h-4 w-4" />
					</Button>
				</div>
			</div>
			<div className="space-y-1">
				<Button 
					variant="ghost" 
					className="w-full justify-start gap-2"
					onClick={() => setExpandedTools(!expandedTools)}
				>
					<Bot className="h-4 w-4" />
					Graphyn tools ({tools.length})
				</Button>
				<AnimatePresence>
					{expandedTools && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3 }}
							className="ml-6 space-y-1 overflow-hidden"
						>
							{filteredTools.map((tool, index) => (
								<motion.div
									key={tool.name}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.3, delay: index * 0.05 }}
								>
									<Button variant="ghost" size="sm" className="w-full justify-start gap-2">
										<tool.icon className="h-4 w-4" />
										{tool.name}
									</Button>
								</motion.div>
							))}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}