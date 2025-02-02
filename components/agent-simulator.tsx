'use client'

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ToolsPanel } from "@/components/tools-panel"
import { VariablesPanel } from "@/components/variables-panel"

export function AgentSimulator() {
	const [message, setMessage] = useState("")
	const [conversation, setConversation] = useState<Array<{role: 'user' | 'assistant', content: string}>>([])
	const [isToolsPanelOpen, setIsToolsPanelOpen] = useState(true)
	const [isVariablesPanelOpen, setIsVariablesPanelOpen] = useState(true)

	const handleSend = () => {
		if (!message.trim()) return
		
		setConversation(prev => [...prev, { role: 'user', content: message }])
		// TODO: Implement agent response logic
		setMessage("")
	}

	return (
		<div className="h-[calc(100vh-16rem)] flex bg-background rounded-lg border">
			<div
				className={cn(
					"w-80 border-r bg-muted/40 transition-all duration-300 ease-in-out relative",
					isToolsPanelOpen ? "translate-x-0" : "-translate-x-full"
				)}
			>
				<ToolsPanel />
			</div>
			<Button
				variant="ghost"
				size="icon"
				className="absolute left-80 top-1/2 -translate-y-1/2 z-10 bg-background shadow-md rounded-full"
				onClick={() => setIsToolsPanelOpen(!isToolsPanelOpen)}
			>
				{isToolsPanelOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
			</Button>

			<div className="flex-1 flex flex-col">
				<Tabs defaultValue="conversation">
					<div className="border-b">
						<TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
							<TabsTrigger
								value="conversation"
								className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
							>
								Conversation
							</TabsTrigger>
							<TabsTrigger
								value="memory"
								className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
							>
								Memory
							</TabsTrigger>
						</TabsList>
					</div>

					<TabsContent value="conversation" className="flex-1 p-0 m-0">
						<div className="flex-1 p-4">
							<ScrollArea className="h-[calc(100vh-24rem)]">
								{conversation.map((msg, i) => (
									<div key={i} className={`flex gap-4 mb-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
										<div className={`max-w-[80%] rounded-lg p-3 ${
											msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
										}`}>
											{msg.content}
										</div>
									</div>
								))}
							</ScrollArea>
						</div>
					</TabsContent>

					<TabsContent value="memory" className="flex-1 p-4 m-0">
						<div className="text-muted-foreground">
							Memory visualization coming soon...
						</div>
					</TabsContent>
				</Tabs>

			<div className="border-t p-4">
				<div className="flex gap-2">
					<Textarea
						placeholder="Type your message..."
						className="min-h-[80px] resize-none"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter' && !e.shiftKey) {
								e.preventDefault()
								handleSend()
							}
						}}
					/>
					<Button className="shrink-0" onClick={handleSend}>
						Send
					</Button>
				</div>
			</div>
		  </div>

		  <div
			className={cn(
			  "w-80 border-l bg-muted/40 transition-all duration-300 ease-in-out relative",
			  isVariablesPanelOpen ? "translate-x-0" : "translate-x-full"
			)}
		  >
			<VariablesPanel />
		  </div>
		  <Button
			variant="ghost"
			size="icon"
			className="absolute right-80 top-1/2 -translate-y-1/2 z-10 bg-background shadow-md rounded-full"
			onClick={() => setIsVariablesPanelOpen(!isVariablesPanelOpen)}
		  >
			{isVariablesPanelOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
		  </Button>
		</div>
	  )
}