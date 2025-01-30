import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { rateLimiters } from '@/lib/auth/rate-limiter'

export async function apiMiddleware(request: NextRequest) {
	const ip = request.ip || 'anonymous'
	const path = request.nextUrl.pathname
	const identifier = `${ip}:${path}`

	// Select appropriate rate limiter based on path
	const limiter = path.includes('/auth') 
		? rateLimiters.auth 
		: rateLimiters.api

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

	// Continue processing the request
	// The actual response will be created by the route handler
	// We'll attach rate limit info to the request for the route handler to use
	request.headers.set('X-RateLimit-Limit', limiter.config.max.toString())
	request.headers.set('X-RateLimit-Remaining', result.remaining.toString())
	request.headers.set('X-RateLimit-Reset', result.resetTime.toString())

	return null
}
