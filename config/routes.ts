export const routes = {
	home: '/',
	signIn: '/sign-in',
	signUp: '/sign-up',
	engine: {
		root: '/engine',
		overview: '/engine',
		playground: '/engine/playground',
		history: '/engine/history',
		starred: '/engine/starred',
		agents: '/engine/agents',
		settings: '/engine/settings',
		memories: '/engine/memories'
	},
	howItWorks: '/how-it-works',
	businessPlan: '/business-plan'
} as const;