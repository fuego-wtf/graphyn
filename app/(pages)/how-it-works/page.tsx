export default function HowItWorksPage() {
	return (
		<div className="container py-8">
			<h1 className="text-4xl font-bold mb-6">How It Works</h1>
			
			<div className="space-y-8">
				<section>
					<h2 className="text-2xl font-semibold mb-4">AI Agents</h2>
					<p className="text-muted-foreground">
						Our AI agents are designed to be powerful, flexible, and easy to manage. They can be customized to handle a wide range of tasks while maintaining context and learning from interactions.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Memory Management</h2>
					<p className="text-muted-foreground">
						The memory system allows agents to retain and recall information effectively, creating a more coherent and context-aware AI experience. All memories are securely stored and easily manageable.
					</p>
				</section>
			</div>
		</div>
	)
}