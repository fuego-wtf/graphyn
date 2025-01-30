export interface VectorMetadata {
	id: string;
	type: string;
	timestamp: string;
	[key: string]: any;
}

export interface VectorEntry {
	id: string;
	vector: number[];
	metadata: VectorMetadata;
}

export class VectorStore {
	private vectors: Map<string, VectorEntry>;

	constructor() {
		this.vectors = new Map();
	}

	async add(entry: VectorEntry): Promise<void> {
		this.vectors.set(entry.id, entry);
	}

	async get(id: string): Promise<VectorEntry | undefined> {
		return this.vectors.get(id);
	}

	async delete(id: string): Promise<void> {
		this.vectors.delete(id);
	}

	async findSimilar(vector: number[], limit = 5): Promise<VectorEntry[]> {
		const entries = Array.from(this.vectors.values());
		return entries
			.map(entry => ({
				...entry,
				similarity: this.cosineSimilarity(vector, entry.vector)
			}))
			.sort((a, b) => b.similarity - a.similarity)
			.slice(0, limit)
			.map(({ similarity, ...entry }) => entry);
	}

	private cosineSimilarity(a: number[], b: number[]): number {
		if (a.length !== b.length) return 0;
		
		let dotProduct = 0;
		let normA = 0;
		let normB = 0;
		
		for (let i = 0; i < a.length; i++) {
			dotProduct += a[i] * b[i];
			normA += a[i] * a[i];
			normB += b[i] * b[i];
		}
		
		if (normA === 0 || normB === 0) return 0;
		return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
	}

	async clear(): Promise<void> {
		this.vectors.clear();
	}

	async count(): Promise<number> {
		return this.vectors.size;
	}
}