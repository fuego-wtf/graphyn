import { create } from 'zustand'

interface Agent {
	id: string
	name: string
	description: string
	status: 'active' | 'inactive'
}

interface AgentStore {
	agents: Agent[]
	addAgent: (agent: Agent) => void
	updateAgent: (id: string, agent: Partial<Agent>) => void
	removeAgent: (id: string) => void
}

export const useAgentStore = create<AgentStore>((set) => ({
	agents: [],
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
}))