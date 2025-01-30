import { NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { verifyAuth } from '@/lib/auth/verify-auth'
import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1]
    const payload = await verifyAuth(token)
    if (!payload) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const data = await req.json()
    
    const agent = {
      id: nanoid(),
      ...data,
      userId: payload.sub,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      stats: {
        totalMemories: 0,
        activeTime: "0h",
        lastActive: new Date().toISOString(),
        processingPower: "0"
      }
    }

    return NextResponse.json(agent)
  } catch (error) {
    console.error('[AGENTS_POST]', error)
    if (error.message === 'Token is blacklisted' || error.message === 'Invalid token type') {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    return new NextResponse('Internal Error', { status: 500 })
  }
}