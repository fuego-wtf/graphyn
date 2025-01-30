// Mock in-memory storage
const store = new Map<string, { value: string; expiry: number | null }>();

// Mock Redis client implementation
export async function getRedisClient() {
	return null; // Not needed for mock
}

export async function setWithTTL(key: string, value: string, ttlSeconds: number) {
	const expiry = ttlSeconds ? Date.now() + (ttlSeconds * 1000) : null;
	store.set(key, { value, expiry });
}

export async function get(key: string) {
	const item = store.get(key);
	if (!item) return null;
	
	if (item.expiry && item.expiry < Date.now()) {
		store.delete(key);
		return null;
	}
	
	return item.value;
}

export async function del(key: string) {
	store.delete(key);
}

export async function addToBlacklist(token: string, expiryTimestamp: number) {
	const ttl = Math.ceil((expiryTimestamp - Date.now()) / 1000);
	if (ttl > 0) {
		await setWithTTL(`blacklist:${token}`, '1', ttl);
	}
}

export async function isBlacklisted(token: string) {
	const value = await get(`blacklist:${token}`);
	return value !== null;
}

// Cleanup expired keys periodically
setInterval(() => {
	// Convert Map entries to array before iteration
	Array.from(store).forEach(([key, item]) => {
		if (item.expiry && item.expiry < Date.now()) {
			store.delete(key);
		}
	});
}, 60000); // Clean up every minute