export interface GraphNode<T = any> {
	id: string;
	data: T;
	metadata: Record<string, any>;
}

export interface GraphEdge {
	source: string;
	target: string;
	weight: number;
	metadata: Record<string, any>;
}

export class Graph<T = any> {
	private nodes: Map<string, GraphNode<T>>;
	private edges: Map<string, GraphEdge[]>;

	constructor() {
		this.nodes = new Map();
		this.edges = new Map();
	}

	addNode(id: string, data: T, metadata: Record<string, any> = {}): void {
		this.nodes.set(id, { id, data, metadata });
	}

	addEdge(source: string, target: string, weight = 1, metadata: Record<string, any> = {}): void {
		if (!this.nodes.has(source) || !this.nodes.has(target)) {
			throw new Error('Source or target node does not exist');
		}

		const edge: GraphEdge = { source, target, weight, metadata };
		const sourceEdges = this.edges.get(source) || [];
		sourceEdges.push(edge);
		this.edges.set(source, sourceEdges);
	}

	getNode(id: string): GraphNode<T> | undefined {
		return this.nodes.get(id);
	}

	getEdges(nodeId: string): GraphEdge[] {
		return this.edges.get(nodeId) || [];
	}

	getNeighbors(nodeId: string): GraphNode<T>[] {
		const edges = this.getEdges(nodeId);
		return edges
			.map(edge => this.getNode(edge.target))
			.filter((node): node is GraphNode<T> => node !== undefined);
	}

	findPath(start: string, end: string): string[] {
		const visited = new Set<string>();
		const queue: { node: string; path: string[] }[] = [{ node: start, path: [start] }];

		while (queue.length > 0) {
			const { node, path } = queue.shift()!;
			if (node === end) return path;

			for (const neighbor of this.getNeighbors(node)) {
				if (!visited.has(neighbor.id)) {
					visited.add(neighbor.id);
					queue.push({ node: neighbor.id, path: [...path, neighbor.id] });
				}
			}
		}

		return [];
	}

	getAllNodes(): GraphNode<T>[] {
		return Array.from(this.nodes.values());
	}

	getAllEdges(): GraphEdge[] {
		return Array.from(this.edges.values()).flat();
	}
}