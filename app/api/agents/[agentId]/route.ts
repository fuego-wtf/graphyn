import { NextResponse } from 'next/server'
import { verifyAuth } from '@/lib/auth/verify-auth'
import { getAgent, saveAgent, deleteAgent } from '@/lib/redis/client'
import type { NextRequest } from 'next/server'
import type { Agent } from '@/types/agent'

export async function GET(request: NextRequest, { params }: { params: any }): Promise<NextResponse> {
  const agentId = Array.isArray(params.agentId) ? params.agentId[0] : params.agentId;
  try {
    const token = request.headers.get('authorization')?.split(' ')[1]
    const payload = await verifyAuth(token)
    if (!payload) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const agent = await getAgent(agentId)

    
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

// Similar changes for PUT and DELETE handlers
export async function PUT(request: NextRequest, { params }: { params: any }) {
  const agentId = Array.isArray(params.agentId) ? params.agentId[0] : params.agentId;
  try {
    const token = request.headers.get('authorization')?.split(' ')[1]
    const payload = await verifyAuth(token)
    if (!payload) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const existingAgent = await getAgent(agentId)

    
    if (!existingAgent || existingAgent.userId !== payload.sub) {
      return new NextResponse('Not Found', { status: 404 })
    }

    const data = await request.json()
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

export async function DELETE(request: NextRequest, { params }: { params: any }) {
  const agentId = Array.isArray(params.agentId) ? params.agentId[0] : params.agentId;
  try {
    const token = request.headers.get('authorization')?.split(' ')[1]
    const payload = await verifyAuth(token)
    if (!payload) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const agent = await getAgent(agentId)

    
    if (!agent || agent.userId !== payload.sub) {
      return new NextResponse('Not Found', { status: 404 })
    }

    await deleteAgent(agentId, payload.sub)
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[AGENT_DELETE]', error)
    if (error instanceof Error && (error.message === 'Token is blacklisted' || error.message === 'Invalid token type')) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    return new NextResponse('Internal Error', { status: 500 })
  }
}