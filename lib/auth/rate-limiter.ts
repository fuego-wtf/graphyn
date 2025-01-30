export interface RateLimitConfig {
	windowMs: number;  // Time window in milliseconds
	max: number;       // Max requests per window
	keyPrefix?: string;
}

// In-memory store for rate limiting
const store = new Map<string, Set<number>>();

export class RateLimiter {
	public readonly config: RateLimitConfig;

	constructor(config: RateLimitConfig) {
		this.config = {
			keyPrefix: 'rate-limit:',
			...config
		};
	}

	private getKey(identifier: string): string {
		return `${this.config.keyPrefix}${identifier}`;
	}

	async isRateLimited(identifier: string): Promise<{
		limited: boolean;
		remaining: number;
		resetTime: number;
	}> {
		const key = this.getKey(identifier);
		const now = Date.now();
		const windowStart = now - this.config.windowMs;

		// Initialize or get timestamps for this key
		if (!store.has(key)) {
			store.set(key, new Set());
		}
		const timestamps = store.get(key)!;

		// Clean old requests
		const oldTimestamps = Array.from(timestamps).filter(ts => ts < windowStart);
		oldTimestamps.forEach(ts => timestamps.delete(ts));

		// Check if rate limited
		if (timestamps.size >= this.config.max) {
			const oldestTimestamp = Math.min(...Array.from(timestamps));
			const resetTime = oldestTimestamp + this.config.windowMs;

			return {
				limited: true,
				remaining: 0,
				resetTime
			};
		}

		// Add current request
		timestamps.add(now);

		return {
			limited: false,
			remaining: this.config.max - timestamps.size,
			resetTime: now + this.config.windowMs
		};
	}
}

// Default configurations
export const rateLimiters = {
	auth: new RateLimiter({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100,
		keyPrefix: 'rate-limit:auth:'
	}),
	api: new RateLimiter({
		windowMs: 60 * 1000, // 1 minute
		max: 60,
		keyPrefix: 'rate-limit:api:'
	})
};