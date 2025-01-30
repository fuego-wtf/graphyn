'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const initialVariables = {
	agent_name: "context-mapper-1",
	model: "model-agnostic",
	temperature: 0.7,
	max_tokens: 1000
}

export function VariablesPanel() {
	const [variables, setVariables] = useState(initialVariables)
	const [isEditing, setIsEditing] = useState(false)

	const handleChange = (key: string, value: string | number) => {
		setVariables(prev => ({ ...prev, [key]: value }))
	}

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h2 className="text-lg font-semibold">System Variables</h2>
				<Button 
					variant="outline" 
					size="sm"
					onClick={() => setIsEditing(!isEditing)}
				>
					{isEditing ? 'Save' : 'Edit'}
				</Button>
			</div>
			<div className={`space-y-4 ${!isEditing ? 'hidden' : ''}`}>
				{Object.entries(variables).map(([key, value]) => (
					<div key={key} className="space-y-2">
						<Label htmlFor={key}>{key}</Label>
						<Input
							id={key}
							value={value}
							onChange={(e) => handleChange(key, e.target.value)}
							disabled={!isEditing}
						/>
					</div>
				))}
			</div>
			<pre className="bg-muted p-4 rounded-lg overflow-auto">
				{JSON.stringify(variables, null, 2)}
			</pre>
		</div>
	)
}