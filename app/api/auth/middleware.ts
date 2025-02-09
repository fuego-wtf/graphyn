import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { RateLimiter } from '@/lib/auth/rate-limiter'
import { getAuth } from '@clerk/nextjs/server'

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
	// Only proceed with rate limiting for API routes
	if (!request.nextUrl.pathname.startsWith('/api/')) {
		return null;
	}

	const forwarded = request.headers.get('x-forwarded-for')
	const ip = forwarded ? forwarded.split(',')[0].trim() : 'anonymous'
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

	const response = NextResponse.next()
	
	// Add rate limit headers to the response instead of the request
	response.headers.set('X-RateLimit-Limit', limiter.config.max.toString())
	response.headers.set('X-RateLimit-Remaining', result.remaining.toString())
	response.headers.set('X-RateLimit-Reset', result.resetTime.toString())

	return response
}