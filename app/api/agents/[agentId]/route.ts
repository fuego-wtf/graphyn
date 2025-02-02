import { NextResponse } from 'next/server'
import { verifyAuth } from '@/lib/auth/verify-auth'
import { getAgent, saveAgent, deleteAgent } from '@/lib/redis/client'
import type { NextRequest } from 'next/server'
import type { Agent } from '@/types/agent'

export async function GET(req: NextRequest, { params }: { params: { agentId: string } }) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1]
    const payload = await verifyAuth(token)
    if (!payload) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const agent = await getAgent(params.agentId)
    if (!agent || agent.userId !== payload.sub) {
      return new NextResponse('Not Found', { status: 404 })
    }

    return NextResponse.json(agent)
  } catch (error) {
    console.error('[AGENT_GET]', error)
    if (error instanceof Error && (error.message === 'Token is blacklisted' || error.message === 'Invalid token type')) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { agentId: string } }) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1]
    const payload = await verifyAuth(token)
    if (!payload) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const existingAgent = await getAgent(params.agentId)
    if (!existingAgent || existingAgent.userId !== payload.sub) {
      return new NextResponse('Not Found', { status: 404 })
    }

    const data = await req.json()
    const updatedAgent: Agent = {
      ...existingAgent,
      name: data.name || existingAgent.name,
      systemPrompt: data.systemPrompt || existingAgent.systemPrompt,
      context: data.context ?? existingAgent.context,
      settings: {
        ...existingAgent.settings,
        ...data.settings
      },
      updatedAt: new Date().toISOString()
    }

    await saveAgent(updatedAgent)
    return NextResponse.json(updatedAgent)
  } catch (error) {
    console.error('[AGENT_UPDATE]', error)
    if (error instanceof Error && (error.message === 'Token is blacklisted' || error.message === 'Invalid token type')) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { agentId: string } }) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1]
    const payload = await verifyAuth(token)
    if (!payload) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const agent = await getAgent(params.agentId)
    if (!agent || agent.userId !== payload.sub) {
      return new NextResponse('Not Found', { status: 404 })
    }

    await deleteAgent(params.agentId, payload.sub)
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[AGENT_DELETE]', error)
    if (error instanceof Error && (error.message === 'Token is blacklisted' || error.message === 'Invalid token type')) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    return new NextResponse('Internal Error', { status: 500 })
  }
}
