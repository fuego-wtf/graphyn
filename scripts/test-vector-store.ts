import { config } from 'dotenv';
import { RedisVectorStore } from '../lib/graph/redis-vector-store';
import type { VectorEntry } from '../lib/graph/vector-store';

// Load environment variables
config({ path: '.env.local' });

async function testVectorStore() {
	try {
		const store = new RedisVectorStore('test-vectors');
		
		// Test vector entries
		const vectors: VectorEntry[] = [
			{
				id: 'test1',
				vector: [1, 2, 3],
				metadata: {
					id: 'test1',
					type: 'test',
					timestamp: new Date().toISOString()
				}
			},
			{
				id: 'test2',
				vector: [2, 3, 4],
				metadata: {
					id: 'test2',
					type: 'test',
					timestamp: new Date().toISOString()
				}
			}
		];

		// Add vectors
		console.log('Adding vectors...');
		await Promise.all(vectors.map(v => store.add(v)));

		// Get vector
		console.log('\nRetrieving vector...');
		const result = await store.get('test1');
		console.log('Retrieved vector:', result);

		// Search similar vectors
		console.log('\nSearching similar vectors...');
		const similar = await store.search([1, 2, 3], 2);
		console.log('Similar vectors:', similar);

		// Clean up
		console.log('\nCleaning up...');
		await Promise.all(vectors.map(v => store.delete(v.id)));
		console.log('Test completed successfully');
	  } catch (error) {
		console.error('Error:', error);
	  }
}

testVectorStore();