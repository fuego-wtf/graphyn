import { JWTPayload } from './jwt';
import { setWithTTL, get, del, addToBlacklist, isBlacklisted } from '../redis/client';

export class TokenStore {
	private static readonly PREFIX = 'token:';
	private static readonly SESSION_PREFIX = 'session:';

	static async storeToken(userId: string, token: string, payload: JWTPayload) {
		const key = `${this.PREFIX}${userId}:${payload.jti}`;
		const ttl = payload.exp - Math.floor(Date.now() / 1000);
		
		await setWithTTL(key, JSON.stringify({
			token,
			type: payload.type,
			exp: payload.exp
		}), ttl);

		// Store session reference
		if (payload.type === 'refresh') {
			await setWithTTL(
				`${this.SESSION_PREFIX}${userId}`,
				payload.jti,
				7 * 24 * 60 * 60 // 7 days
			);
		}
	}

	static async getToken(userId: string, tokenId: string) {
		const key = `${this.PREFIX}${userId}:${tokenId}`;
		const data = await get(key);
		return data ? JSON.parse(data) : null;
	}

	static async invalidateToken(token: string, payload: JWTPayload) {
		// Remove token from store
		const key = `${this.PREFIX}${payload.sub}:${payload.jti}`;
		await del(key);

		// Add to blacklist until expiration
		await addToBlacklist(token, payload.exp * 1000);

		// Clear session if refresh token
		if (payload.type === 'refresh') {
			await del(`${this.SESSION_PREFIX}${payload.sub}`);
		}
	}

	static async isTokenValid(token: string, payload: JWTPayload) {
		// Check blacklist
		if (await isBlacklisted(token)) {
			return false;
		}

		// Verify token exists in store
		const storedToken = await this.getToken(payload.sub, payload.jti);
		return storedToken !== null;
	}

	static async getActiveSession(userId: string) {
		return get(`${this.SESSION_PREFIX}${userId}`);
	}
}