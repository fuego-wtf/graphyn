import { NextResponse } from 'next/server';

export class APIError extends Error {
	constructor(
		message: string,
		public status: number = 500,
		public code?: string
	) {
		super(message);
		this.name = 'APIError';
	}
}

interface ErrorResponse {
	error: {
		message: string;
		code?: string;
		status: number;
	};
}

export async function errorHandler(
	error: unknown,
	prefix: string = '[API]'
): Promise<NextResponse<ErrorResponse>> {
	console.error(`${prefix} Error:`, error);

	if (error instanceof APIError) {
		return NextResponse.json(
			{
				error: {
					message: error.message,
					code: error.code,
					status: error.status
				}
			},
			{ status: error.status }
		);
	}

	// Rate limit error
	if (error instanceof Error && error.message.includes('rate limit')) {
		return NextResponse.json(
			{
				error: {
					message: 'Too many requests',
					code: 'RATE_LIMIT_EXCEEDED',
					status: 429
				}
			},
			{ status: 429 }
		);
	}

	// Auth errors
	if (error instanceof Error && 
		(error.message.includes('unauthorized') || error.message.includes('token'))) {
		return NextResponse.json(
			{
				error: {
					message: 'Unauthorized',
					code: 'UNAUTHORIZED',
					status: 401
				}
			},
			{ status: 401 }
		);
	}

	// Default server error
	return NextResponse.json(
		{
			error: {
				message: 'Internal server error',
				code: 'INTERNAL_ERROR',
				status: 500
			}
		},
		{ status: 500 }
	);
}