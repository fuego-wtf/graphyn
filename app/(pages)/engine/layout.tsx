import { Sidebar } from "@/components/sidebar"

export default function EngineLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="min-h-screen flex">
			<Sidebar />
			<main className="flex-1">
				{children}
			</main>
		</div>
	)
}

