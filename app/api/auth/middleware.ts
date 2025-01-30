import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { RateLimiter } from '@/lib/auth/rate-limiter'

// Create specific rate limiters for different auth operations
const loginLimiter = new RateLimiter({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 5, // 5 attempts
	keyPrefix: 'rate-limit:auth:login:'
})

const authLimiter = new RateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // 100 requests
	keyPrefix: 'rate-limit:auth:'
})

export async function authMiddleware(request: NextRequest) {
	const ip = request.ip || 'anonymous'
	const path = request.nextUrl.pathname
	const identifier = `${ip}:${path}`

	// Use stricter limits for login attempts
	const limiter = path.endsWith('/login') ? loginLimiter : authLimiter
	const result = await limiter.isRateLimited(identifier)

	if (result.limited) {
		return new NextResponse('Too many requests', { 
			status: 429,
			headers: {
				'Retry-After': Math.ceil((result.resetTime - Date.now()) / 1000).toString(),
				'X-RateLimit-Limit': limiter.config.max.toString(),
				'X-RateLimit-Remaining': '0',
				'X-RateLimit-Reset': result.resetTime.toString()
			}
		})
	}

	// Add rate limit headers to the request for the route handler
	request.headers.set('X-RateLimit-Limit', limiter.config.max.toString())
	request.headers.set('X-RateLimit-Remaining', result.remaining.toString())
	request.headers.set('X-RateLimit-Reset', result.resetTime.toString())

	return null
}