import { Graph, GraphNode, GraphEdge } from "./core";
import { Memory } from "@/types/memory";
import { RedisVectorStore } from "./redis-vector-store";

export interface MemoryNode extends GraphNode<Memory> {
	embeddings: number[];
	relevanceScore: number;
}

export class MemoryGraph extends Graph<Memory> {
	private vectorStore: RedisVectorStore;

	constructor() {
		super();
		this.vectorStore = new RedisVectorStore();
	}

	async addMemory(memory: Memory, embeddings: number[]): Promise<void> {
		// Add to graph
		const metadata = {
			type: memory.type,
			timestamp: memory.timestamp,
			...memory.metadata
		};
		this.addNode(memory.id, memory, metadata);

		// Add to vector store
		await this.vectorStore.add({
			id: memory.id,
			vector: embeddings,
			metadata: {
				id: memory.id,
				type: memory.type,
				timestamp: memory.timestamp
			}
		});

		// Find similar memories and create edges
		const similar = await this.findSimilarMemories(memory.id, 0.5);
		similar.forEach(sim => {
			this.addEdge(memory.id, sim.id, sim.similarity || 0.5);
		});
	}

	async findSimilarMemories(memoryId: string, threshold = 0.5): Promise<MemoryNode[]> {
		const entry = await this.vectorStore.get(memoryId);
		if (!entry) return [];

		const similarEntries = await this.vectorStore.findSimilar(entry.vector);
		return similarEntries
			.map(entry => {
				const node = this.getNode(entry.id);
				if (!node) return null;
				return {
					...node,
					embeddings: entry.vector,
					relevanceScore: 1
				};
			})
			.filter((node): node is MemoryNode => node !== null);
	}

	getTemporalPath(startId: string, endId: string): Memory[] {
		const path = this.findPath(startId, endId);
		return path
			.map(id => this.getNode(id)?.data)
			.filter((m): m is Memory => m !== undefined);
	}

	getMemoriesByType(type: Memory["type"]): Memory[] {
		return this.getAllNodes()
			.filter(node => node.metadata.type === type)
			.map(node => node.data);
	}

	async getRecentMemories(limit = 10): Promise<Memory[]> {
		return this.getAllNodes()
			.sort((a, b) => 
				new Date(b.data.timestamp).getTime() - 
				new Date(a.data.timestamp).getTime()
			)
			.slice(0, limit)
			.map(node => node.data);
	}
}