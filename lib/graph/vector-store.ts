/**
 * Metadata associated with a vector entry
 */
export interface VectorMetadata {
	id: string;
	type: string;
	timestamp: string;
	[key: string]: any;
}

/**
 * A single vector entry with its metadata
 */
export interface VectorEntry {
	id: string;
	vector: number[];
	metadata: VectorMetadata;
}

/**
 * Interface for vector storage and retrieval operations
 */
export interface VectorStore {
	/**
	 * Add a new vector entry to the store
	 * @param entry The vector entry to add
	 */
	add(entry: VectorEntry): Promise<void>;

	/**
	 * Retrieve a vector entry by its ID
	 * @param id The ID of the vector entry
	 * @returns The vector entry if found, null otherwise
	 */
	get(id: string): Promise<VectorEntry | null>;

	/**
	 * Delete a vector entry by its ID
	 * @param id The ID of the vector entry to delete
	 */
	delete(id: string): Promise<void>;

	/**
	 * Search for similar vectors
	 * @param vector The query vector
	 * @param limit Maximum number of results to return
	 * @returns Array of similar vector entries
	 */
	search(vector: number[], limit?: number): Promise<VectorEntry[]>;
}