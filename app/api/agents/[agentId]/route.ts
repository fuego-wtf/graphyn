import { NextResponse } from 'next/server'
import { verifyAuth } from '@/lib/auth/verify-auth'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { agentId: string } }) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1]
    const payload = await verifyAuth(token)
    if (!payload) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // TODO: Replace with actual database query
    const agent = {
      id: params.agentId,
      userId: payload.sub,
      // ... rest of the agent data
    }

    return NextResponse.json(agent)
  } catch (error) {
    console.error('[AGENT_GET]', error)
    if (error.message === 'Token is blacklisted' || error.message === 'Invalid token type') {
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

    const body = await req.json()
    const { name, systemPrompt, context } = body

    if (!name?.trim() || !systemPrompt?.trim()) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    // TODO: Update agent in database
    const agent = {
      id: params.agentId,
      userId: payload.sub,
      name,
      systemPrompt,
      context: context || '',
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(agent)
  } catch (error) {
    console.error('[AGENT_UPDATE]', error)
    if (error.message === 'Token is blacklisted' || error.message === 'Invalid token type') {
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

    // TODO: Replace with actual database deletion
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[AGENT_DELETE]', error)
    if (error.message === 'Token is blacklisted' || error.message === 'Invalid token type') {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    return new NextResponse('Internal Error', { status: 500 })
  }
}