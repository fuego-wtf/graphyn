import { MemoryList } from "@/components/memory-list"

export default function KnowledgePage() {
	return (
		<div className="space-y-8 p-8">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Knowledge Base</h1>
				<p className="text-muted-foreground mt-2">Manage and explore agent memories and knowledge graphs</p>
			</div>
			<div className="rounded-lg border bg-card">
				<MemoryList />
			</div>
		</div>
	)
}