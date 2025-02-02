import { NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { verifyAuth } from '@/lib/auth/verify-auth'
import { saveAgent, getUserAgents } from '@/lib/redis/client'
import type { NextRequest } from 'next/server'
import type { Agent } from '@/types/agent'

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1]
    const payload = await verifyAuth(token)
    if (!payload) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const data = await req.json()
    
    const agent: Agent = {
      id: nanoid(),
      name: data.name,
      systemPrompt: data.systemPrompt,
      context: data.context || '',
      userId: payload.sub,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: false,
      status: 'idle',
      settings: {
      temperature: data.settings?.temperature ?? 0.7,
      maxTokens: data.settings?.maxTokens ?? 2000,
      model: data.settings?.model ?? 'gpt-4',
      topP: data.settings?.topP ?? 0.9,
      memoryLimit: data.settings?.memoryLimit ?? 100
      },
      stats: {
      totalMemories: 0,
      activeTime: "0h",
      lastActive: new Date().toISOString(),
      processingPower: "0"
      },
      memories: []
    }

    // Save agent to Redis
    await saveAgent(agent)

    return NextResponse.json(agent)
  } catch (error) {
    console.error('[AGENTS_POST]', error)
    if (error instanceof Error && (error.message === 'Token is blacklisted' || error.message === 'Invalid token type')) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1]
    const payload = await verifyAuth(token)
    if (!payload) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const agents = await getUserAgents(payload.sub)
    return NextResponse.json(agents)
  } catch (error) {
    console.error('[AGENTS_GET]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}