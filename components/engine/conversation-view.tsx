'use client'

import { useState } from "react"
import { useConversation } from "./conversation-context"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Bot, User, Send } from 'lucide-react'

export function ConversationView() {
	const { segments } = useConversation()
	const [message, setMessage] = useState("")

	const handleSend = () => {
		// TODO: Implement send logic
		setMessage("")
	}

	return (
		<div className="h-full flex flex-col">
			<div className="flex-1 space-y-4 overflow-auto pr-4">
				{segments.map((segment, i) => (
					<div
						key={i}
						className="flex gap-4"
					>
						{segment.speaker === "Speaker 1" ? (
							<div className="size-8 rounded-full bg-blue-500 flex items-center justify-center text-white shrink-0">
								<User className="size-4" />
							</div>
						) : (
							<div className="size-8 rounded-full bg-purple-500 flex items-center justify-center text-white shrink-0">
								<Bot className="size-4" />
							</div>
						)}
						<div className="flex-1 space-y-1">
							<div className="font-medium">{segment.speaker}</div>
							<p className="text-sm text-muted-foreground">{segment.text}</p>
						</div>
					</div>
				))}
			</div>
			<div className="border-t mt-4 pt-4">
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
						<Send className="size-4 mr-2" />
						Send
					</Button>
				</div>
			</div>
		</div>
	)
}