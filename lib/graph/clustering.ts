import { Graph, GraphNode } from "./core";

export interface Cluster {
	id: string;
	nodes: string[];
	centroid?: string;
	similarity: number;
	metadata: Record<string, any>;
}

export class GraphClustering<T = any> {
	constructor(private graph: Graph<T>) {}

	findClusters(minSimilarity = 0.5): Cluster[] {
		const nodes = this.graph.getAllNodes();
		const visited = new Set<string>();
		const clusters: Cluster[] = [];

		nodes.forEach(node => {
			if (visited.has(node.id)) return;

			const cluster = this.expandCluster(node, visited, minSimilarity);
			if (cluster.nodes.length > 1) {
				clusters.push(cluster);
			}
		});

		return clusters;
	}

	private expandCluster(
		node: GraphNode<T>,
		visited: Set<string>,
		minSimilarity: number
	): Cluster {
		const clusterNodes = [node.id];
		visited.add(node.id);

		const neighbors = this.graph.getNeighbors(node.id);
		const queue = [...neighbors];

		while (queue.length > 0) {
			const current = queue.shift()!;
			if (visited.has(current.id)) continue;

			const edges = this.graph.getEdges(node.id);
			const similarity = edges.find(e => e.target === current.id)?.weight || 0;

			if (similarity >= minSimilarity) {
				clusterNodes.push(current.id);
				visited.add(current.id);

				// Add unvisited neighbors to queue
				const nextNeighbors = this.graph.getNeighbors(current.id)
					.filter(n => !visited.has(n.id));
				queue.push(...nextNeighbors);
			}
		}

		return {
			id: `cluster_${node.id}`,
			nodes: clusterNodes,
			centroid: node.id,
			similarity: this.calculateClusterSimilarity(clusterNodes),
			metadata: {
				size: clusterNodes.length,
				type: node.metadata.type
			}
		};
	}

	private calculateClusterSimilarity(nodeIds: string[]): number {
		if (nodeIds.length <= 1) return 1;

		let totalSimilarity = 0;
		let comparisons = 0;

		for (let i = 0; i < nodeIds.length; i++) {
			for (let j = i + 1; j < nodeIds.length; j++) {
				const edges = this.graph.getEdges(nodeIds[i]);
				const similarity = edges.find(e => e.target === nodeIds[j])?.weight || 0;
				totalSimilarity += similarity;
				comparisons++;
			}
		}

		return comparisons > 0 ? totalSimilarity / comparisons : 0;
	}
}