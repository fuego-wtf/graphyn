import { NextResponse } from 'next/server'
import { generateToken, verifyToken } from '@/lib/auth/jwt'
import { TokenStore } from '@/lib/auth/token-store'
import { errorHandler, APIError } from '@/lib/api/error-handler'
import { authMiddleware } from '../middleware'
import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
	try {
		// Check rate limiting
		const middlewareResponse = await authMiddleware(req)
		if (middlewareResponse) return middlewareResponse

		// Get refresh token from HTTP-only cookie
		const refreshToken = req.cookies.get('refresh_token')?.value
		if (!refreshToken) {
			throw new APIError('Refresh token required', 400, 'REFRESH_TOKEN_MISSING')
		}

		try {
			// Verify the refresh token
			const payload = await verifyToken(refreshToken)
			if (!payload || payload.type !== 'refresh') {
				throw new APIError('Invalid refresh token', 401, 'INVALID_REFRESH_TOKEN')
			}

			// Invalidate old refresh token
			await TokenStore.invalidateToken(refreshToken, payload)
				.catch(() => {
					throw new APIError('Token invalidation failed', 500, 'TOKEN_INVALIDATION_ERROR')
				})

			// Generate new tokens
			const [newAccessToken, newRefreshToken] = await Promise.all([
				generateToken(payload.sub, 'access'),
				generateToken(payload.sub, 'refresh')
			]).catch(() => {
				throw new APIError('Token generation failed', 500, 'TOKEN_GENERATION_ERROR')
			})

			// Store new tokens
			const [accessPayload, refreshPayload] = await Promise.all([
				verifyToken(newAccessToken),
				verifyToken(newRefreshToken)
			])

			await Promise.all([
				TokenStore.storeToken(payload.sub, newAccessToken, accessPayload),
				TokenStore.storeToken(payload.sub, newRefreshToken, refreshPayload)
			]).catch(() => {
				throw new APIError('Token storage failed', 500, 'TOKEN_STORAGE_ERROR')
			})

			// Set new HTTP-only cookies
			const response = NextResponse.json({
				tokenType: 'Bearer',
				expiresIn: 900 // 15 minutes
			})

			response.cookies.set('access_token', newAccessToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				maxAge: 900 // 15 minutes
			})

			response.cookies.set('refresh_token', newRefreshToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				maxAge: 7 * 24 * 60 * 60 // 7 days
			})

			return response
		} catch (error) {
			if (error instanceof APIError) throw error
			if (error instanceof Error && 'code' in error && error.code === 'ERR_JWT_EXPIRED') {
				throw new APIError('Token expired', 401, 'TOKEN_EXPIRED')
			}
			throw new APIError('Token refresh failed', 500, 'TOKEN_REFRESH_ERROR')
		}
	} catch (error) {
		return errorHandler(error, '[AUTH_REFRESH]')
	}
}