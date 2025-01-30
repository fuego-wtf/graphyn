import { NextResponse } from 'next/server'
import { TokenStore } from '@/lib/auth/token-store'
import { verifyToken } from '@/lib/auth/jwt'
import { errorHandler, APIError } from '@/lib/api/error-handler'
import { authMiddleware } from '../middleware'
import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
	try {
		// Check rate limiting
		const middlewareResponse = await authMiddleware(req)
		if (middlewareResponse) return middlewareResponse

		try {
			// Get tokens from cookies
			const accessToken = req.cookies.get('access_token')?.value
			const refreshToken = req.cookies.get('refresh_token')?.value

			// Invalidate tokens if they exist
			if (accessToken) {
				const accessPayload = await verifyToken(accessToken)
				if (accessPayload) {
					await TokenStore.invalidateToken(accessToken, accessPayload)
						.catch(() => {
							throw new APIError('Access token invalidation failed', 500, 'TOKEN_INVALIDATION_ERROR')
						})
				}
			}

			if (refreshToken) {
				const refreshPayload = await verifyToken(refreshToken)
				if (refreshPayload) {
					await TokenStore.invalidateToken(refreshToken, refreshPayload)
						.catch(() => {
							throw new APIError('Refresh token invalidation failed', 500, 'TOKEN_INVALIDATION_ERROR')
						})
				}
			}

			// Clear cookies
			const response = new NextResponse(null, { status: 204 })
			
			response.cookies.set('access_token', '', {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				maxAge: 0
			})

			response.cookies.set('refresh_token', '', {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				maxAge: 0
			})

			return response
		} catch (error) {
			if (error instanceof APIError) throw error
			if (error instanceof Error && 'code' in error && error.code === 'ERR_JWT_EXPIRED') {
				// Ignore expired tokens during logout
				return new NextResponse(null, { status: 204 })
			}
			throw new APIError('Logout failed', 500, 'LOGOUT_ERROR')
		}
	} catch (error) {
		return errorHandler(error, '[AUTH_LOGOUT]')
	}
}