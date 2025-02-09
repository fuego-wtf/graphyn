import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { rateLimiters } from '@/lib/auth/rate-limiter'

export async function apiMiddleware(request: NextRequest) {
	const forwarded = request.headers.get('x-forwarded-for')
	const realIp = request.headers.get('x-real-ip')
	const ip = forwarded ? forwarded.split(',')[0].trim() : realIp || 'anonymous'
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

	const response = NextResponse.next();
	response.headers.set('X-RateLimit-Limit', limiter.config.max.toString());
	response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
	response.headers.set('X-RateLimit-Reset', result.resetTime.toString());

	return response
}

