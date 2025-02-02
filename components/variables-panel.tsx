'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

const initialVariables = {
	agent_name: "graphyn-agent-1",
	model: "gpt-4",
	temperature: 0.7,
	max_tokens: 1000,
	memory_limit: 100,
	vector_dimensions: 1536
}

export function VariablesPanel() {
	const [variables, setVariables] = useState(initialVariables)
	const [isEditing, setIsEditing] = useState(false)

	const handleChange = (key: string, value: string | number) => {
		setVariables(prev => ({ ...prev, [key]: value }))
	}

	return (
		<div className="space-y-4 p-4">
			<div className="flex justify-between items-center">
				<h2 className="text-lg font-semibold">Agent Configuration</h2>
				<Button 
					variant="outline" 
					size="sm"
					onClick={() => setIsEditing(!isEditing)}
				>
					{isEditing ? 'Save' : 'Edit'}
				</Button>
			</div>
			<motion.div 
				className="space-y-4"
				initial={false}
				animate={isEditing ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
			>
				{Object.entries(variables).map(([key, value]) => (
					<div key={key} className="space-y-2">
						<Label htmlFor={key}>{key.replace(/_/g, ' ').toUpperCase()}</Label>
						<Input
							id={key}
							value={value}
							onChange={(e) => handleChange(key, e.target.value)}
							disabled={!isEditing}
						/>
					</div>
				))}
			</motion.div>
			<pre className="bg-muted p-4 rounded-lg overflow-auto text-xs">
				{JSON.stringify(variables, null, 2)}
			</pre>
		</div>
	)
}