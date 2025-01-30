import { verifyToken } from './jwt'
import { TokenStore } from './token-store'

export async function verifyAuth(token?: string | null) {
	if (!token) {
		return null
	}

	try {
		const payload = await verifyToken(token)
		
		// Verify token is valid in store
		const isValid = await TokenStore.isTokenValid(token, payload)
		if (!isValid) {
			throw new Error('Token is invalid or blacklisted')
		}

		// Check token type
		if (payload.type !== 'access') {
			throw new Error('Invalid token type')
		}

		return payload
	} catch (error) {
		console.error('[AUTH_VERIFY]', error)
		return null
	}
}

export async function verifyRefreshToken(token: string) {
	try {
		const payload = await verifyToken(token)
		
		// Verify token is valid in store
		const isValid = await TokenStore.isTokenValid(token, payload)
		if (!isValid) {
			throw new Error('Token is invalid or blacklisted')
		}

		// Check token type
		if (payload.type !== 'refresh') {
			throw new Error('Invalid token type')
		}

		// Verify active session
		const activeSession = await TokenStore.getActiveSession(payload.sub)
		if (!activeSession || activeSession !== payload.jti) {
			throw new Error('Invalid session')
		}

		return payload
	} catch (error) {
		console.error('[REFRESH_VERIFY]', error)
		return null
	}
}
