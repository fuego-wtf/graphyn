import { NextResponse } from 'next/server'
import { verifyAuth } from '@/lib/auth/verify-auth'
import { apiMiddleware } from '../middleware'
import { errorHandler, APIError } from '@/lib/api/error-handler'
import type { NextRequest } from 'next/server'
import { nanoid } from 'nanoid'
import { z } from 'zod'

const createMemorySchema = z.object({
  agentId: z.string(),
  content: z.string().min(1),
  type: z.enum(['observation', 'reflection', 'plan']),
  metadata: z.record(z.unknown()).optional(),
})

export async function POST(req: NextRequest) {
  try {
    // Check rate limiting
    const middlewareResponse = await apiMiddleware(req)
    if (middlewareResponse) return middlewareResponse

    // Verify authentication
    const token = req.headers.get('authorization')?.split(' ')[1]
    const payload = await verifyAuth(token)
    if (!payload) {
      throw new APIError('Unauthorized', 401, 'AUTH_REQUIRED')
    }

    // Validate request body
    let json
    try {
      json = await req.json()
    } catch {
      throw new APIError('Invalid JSON', 400, 'INVALID_JSON')
    }

    try {
      const body = createMemorySchema.parse(json)
      const memory = {
        id: nanoid(),
        ...body,
        userId: payload.sub,
        createdAt: new Date().toISOString()
      }

      return NextResponse.json(memory)
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        throw new APIError(
          'Validation failed',
          400,
          'VALIDATION_ERROR',
        )
      }
      throw validationError
    }
  } catch (error) {
    return errorHandler(error, '[MEMORIES_POST]')
  }
}