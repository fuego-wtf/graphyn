'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bot, Search, MessageSquare, Image, Globe, Dice6 } from 'lucide-react'

const tools = [
	{ name: "send_sms_message", icon: MessageSquare },
	{ name: "create_image", icon: Image },
	{ name: "search_google", icon: Globe },
	{ name: "role_d20", icon: Dice6 },
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
						placeholder="Search" 
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<Button variant="ghost" size="icon">
						<Search className="size-4" />
					</Button>
				</div>
			</div>
			<div className="space-y-1">
				<Button 
					variant="ghost" 
					className="w-full justify-start gap-2"
					onClick={() => setExpandedTools(!expandedTools)}
				>
					<Bot className="size-4" />
					Core tools ({tools.length})
				</Button>
				{expandedTools && (
					<div className="ml-6 space-y-1">
						{filteredTools.map((tool) => (
							<Button 
								key={tool.name}
								variant="ghost" 
								size="sm" 
								className="w-full justify-start gap-2"
							>
								<tool.icon className="size-4" />
								{tool.name}
							</Button>
						))}
					</div>
				)}
			</div>
		</div>
	)
}