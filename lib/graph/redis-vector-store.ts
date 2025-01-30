import { VectorEntry, VectorStore } from './vector-store';

// Export the in-memory VectorStore implementation instead of Redis-based one
export { VectorStore as RedisVectorStore };
