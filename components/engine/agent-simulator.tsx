'use client'

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from "@/lib/utils"

export function AgentSimulator() {
	const [isToolsPanelOpen, setIsToolsPanelOpen] = useState(true)
	const [isMemoryPanelOpen, setIsMemoryPanelOpen] = useState(true)

	return (
		<div className="flex h-[calc(100vh-4rem)] bg-background">
			<div
				className={cn(
					"w-80 border-r bg-muted/40 p-4 space-y-4 transition-all duration-300 ease-in-out relative",
					isToolsPanelOpen ? "translate-x-0" : "-translate-x-full"
				)}
			>
				{/* ToolsPanel will be implemented */}
				<div>Tools Panel</div>
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
				<Tabs defaultValue="conversation" className="flex-1 flex flex-col">
					<div className="border-b">
						<TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
							<TabsTrigger
								value="conversation"
								className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
							>
								Conversation
							</TabsTrigger>
							<TabsTrigger
								value="context"
								className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
							>
								Context Map
							</TabsTrigger>
							<TabsTrigger
								value="variables"
								className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
							>
								Variables
							</TabsTrigger>
						</TabsList>
					</div>
					<div className="flex-1 flex overflow-hidden">
						<div className="flex-1 p-4 overflow-auto">
							<TabsContent value="conversation" className="h-full mt-0">
								{/* ConversationView will be implemented */}
								<div>Conversation View</div>
							</TabsContent>
							<TabsContent value="context" className="h-full mt-0">
								{/* ContextMap will be implemented */}
								<div>Context Map</div>
							</TabsContent>
							<TabsContent value="variables" className="h-full mt-0">
								{/* VariablesPanel will be implemented */}
								<div>Variables Panel</div>
							</TabsContent>
						</div>
						<div
							className={cn(
								"w-80 border-l bg-muted/40 transition-all duration-300 ease-in-out relative",
								isMemoryPanelOpen ? "translate-x-0" : "translate-x-full"
							)}
						>
							{/* MemoryPanel will be implemented */}
							<div>Memory Panel</div>
						</div>
						<Button
							variant="ghost"
							size="icon"
							className="absolute right-80 top-1/2 -translate-y-1/2 z-10 bg-background shadow-md rounded-full"
							onClick={() => setIsMemoryPanelOpen(!isMemoryPanelOpen)}
						>
							{isMemoryPanelOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
						</Button>
					</div>
				</Tabs>
			</div>
		</div>
	)
}