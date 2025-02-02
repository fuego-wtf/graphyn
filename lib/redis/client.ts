import { Redis } from '@upstash/redis'
import { Agent } from '@/types/agent'

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL!,
	token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Base Redis operations
export async function getRedisClient() {
	return redis
}

export async function setWithTTL(key: string, value: string, ttlSeconds: number) {
	await redis.set(key, value, { ex: ttlSeconds })
}

export async function get(key: string) {
	return redis.get(key)
}

export async function del(key: string) {
	await redis.del(key)
}

// Agent-specific operations
export async function saveAgent(agent: Agent) {
	const key = `agent:${agent.id}`
	await redis.set(key, JSON.stringify(agent))
	await redis.sadd(`user:${agent.userId}:agents`, agent.id)
	return agent
}

export async function getAgent(agentId: string) {
	const agent = await redis.get(`agent:${agentId}`)
	return agent ? JSON.parse(agent as string) : null
}

export async function getUserAgents(userId: string) {
	const agentIds = await redis.smembers(`user:${userId}:agents`)
	const agents = await Promise.all(
		agentIds.map(id => getAgent(id))
	)
	return agents.filter(Boolean)
}

export async function deleteAgent(agentId: string, userId: string) {
	await redis.del(`agent:${agentId}`)
	await redis.srem(`user:${userId}:agents`, agentId)
}

// Auth operations
export async function addToBlacklist(token: string, expiryTimestamp: number) {
	const ttl = Math.ceil((expiryTimestamp - Date.now()) / 1000)
	if (ttl > 0) {
		await setWithTTL(`blacklist:${token}`, '1', ttl)
	}
}

export async function isBlacklisted(token: string) {
	const value = await get(`blacklist:${token}`)
	return value !== null
}