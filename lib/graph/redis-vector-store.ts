import { getRedisClient } from '../redis/client';
import type { VectorEntry, VectorStore } from './vector-store';

export class RedisVectorStore implements VectorStore {
	private readonly namespace: string;

	constructor(namespace: string) {
		this.namespace = namespace;
	}

	private getKey(id: string) {
		return `${this.namespace}:${id}`;
	}

	async add(entry: VectorEntry): Promise<void> {
		const redis = await getRedisClient();
		const key = this.getKey(entry.id);
		
		await redis.hset(key, {
			vector: JSON.stringify(entry.vector),
			metadata: JSON.stringify(entry.metadata)
		});
	}

	async get(id: string): Promise<VectorEntry | null> {
		const redis = await getRedisClient();
		const key = this.getKey(id);
		
		const data = await redis.hgetall(key);
		if (!data || typeof data.vector !== 'string' || typeof data.metadata !== 'string') {
			return null;
		}

		return {
			id,
			vector: JSON.parse(data.vector),
			metadata: JSON.parse(data.metadata)
		};
	}

	async delete(id: string): Promise<void> {
		const redis = await getRedisClient();
		await redis.del(this.getKey(id));
	}

	async search(vector: number[], limit: number = 10): Promise<VectorEntry[]> {
		const redis = await getRedisClient();
		const keys = await redis.keys(`${this.namespace}:*`);
		const entries: VectorEntry[] = [];

		for (const key of keys) {
			const data = await redis.hgetall(key);
			if (data && typeof data.vector === 'string' && typeof data.metadata === 'string') {
				const entry = {
					id: key.split(':')[1],
					vector: JSON.parse(data.vector),
					metadata: JSON.parse(data.metadata)
				};
				entries.push(entry);
			}
		}

		const scores = entries.map(entry => ({
			entry,
			score: this.cosineSimilarity(vector, entry.vector)
		}));

		return scores
			.sort((a, b) => b.score - a.score)
			.slice(0, limit)
			.map(({ entry }) => entry);
	}

	private cosineSimilarity(a: number[], b: number[]): number {
		const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
		const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
		const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
		return dotProduct / (magnitudeA * magnitudeB);
	}

}