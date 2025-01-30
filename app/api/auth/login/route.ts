import { NextResponse } from 'next/server'
import { generateToken, verifyToken } from '@/lib/auth/jwt'
import { TokenStore } from '@/lib/auth/token-store'
import { errorHandler, APIError } from '@/lib/api/error-handler'
import { auth } from '@clerk/nextjs'
import { authMiddleware } from '../middleware'
import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
	try {
		// Check rate limiting
		const middlewareResponse = await authMiddleware(req)
		if (middlewareResponse) return middlewareResponse

		const { userId } = auth()
		if (!userId) {
			throw new APIError('Authentication required', 401, 'AUTH_REQUIRED')
		}

		try {
			// Generate access and refresh tokens
			const [accessToken, refreshToken] = await Promise.all([
				generateToken(userId, 'access'),
				generateToken(userId, 'refresh')
			])

			// Store tokens in Redis
			const [accessPayload, refreshPayload] = await Promise.all([
				verifyToken(accessToken),
				verifyToken(refreshToken)
			])

			await Promise.all([
				TokenStore.storeToken(userId, accessToken, accessPayload),
				TokenStore.storeToken(userId, refreshToken, refreshPayload)
			]).catch(() => {
				throw new APIError('Token storage failed', 500, 'TOKEN_STORAGE_ERROR')
			})

			// Set HTTP-only cookies
			const response = NextResponse.json({
				tokenType: 'Bearer',
				expiresIn: 900 // 15 minutes
			})

			response.cookies.set('access_token', accessToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				maxAge: 900 // 15 minutes
			})

			response.cookies.set('refresh_token', refreshToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				maxAge: 7 * 24 * 60 * 60 // 7 days
			})

			return response
		} catch (error) {
			if (error instanceof APIError) throw error
			throw new APIError('Token generation failed', 500, 'TOKEN_GENERATION_ERROR')
		}
	} catch (error) {
		return errorHandler(error, '[AUTH_LOGIN]')
	}
}