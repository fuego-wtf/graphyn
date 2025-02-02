import { create } from 'zustand'
import type { Agent } from '@/types/agent'
import type { Memory } from '@/types/memory'

interface AgentStore {
	agents: Agent[]
	activeAgent?: Agent
	addAgent: (agent: Agent) => void
	updateAgent: (id: string, agent: Partial<Agent>) => void
	removeAgent: (id: string) => void
	setActiveAgent: (agent: Agent) => void
	addMemory: (agentId: string, memory: Memory) => void
}

export const useAgentStore = create<AgentStore>((set) => ({
	agents: [],
	activeAgent: undefined,
	addAgent: (agent) => set((state) => ({ agents: [...state.agents, agent] })),
	updateAgent: (id, updatedAgent) => 
		set((state) => ({
			agents: state.agents.map((agent) => 
				agent.id === id ? { ...agent, ...updatedAgent } : agent
			),
		})),
	removeAgent: (id) => 
		set((state) => ({
			agents: state.agents.filter((agent) => agent.id !== id),
		})),
	setActiveAgent: (agent) => set({ activeAgent: agent }),
	addMemory: (agentId, memory) =>
		set((state) => ({
			agents: state.agents.map((agent) =>
				agent.id === agentId
					? { ...agent, memories: [...(agent.memories || []), memory] }
					: agent
			),
		})),
}))