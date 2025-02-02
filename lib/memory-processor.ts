import type { Memory } from "@/types/memory"

class MemoryProcessor {
	private queue: Memory[] = []

	async addToQueue(memory: Memory) {
		this.queue.push(memory)
		await this.process(memory)
	}

	private async process(memory: Memory) {
		// Basic processing logic - can be expanded later
		console.log(`Processing memory: ${memory.id}`)
		try {
			// Add processing logic here
			// For now, just remove from queue after "processing"
			this.queue = this.queue.filter(m => m.id !== memory.id)
		} catch (error) {
			console.error('Error processing memory:', error)
			throw error
		}
	}
}

export const memoryProcessor = new MemoryProcessor()