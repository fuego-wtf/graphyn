import { Graph, GraphNode, GraphEdge } from "./core";
import { Memory } from "@/types/memory";
import { GraphClustering, Cluster } from "./clustering";

export interface GraphMetrics {
	centrality: Record<string, number>;
	communities: string[][];
	clusters: Cluster[];
	density: number;
	avgDegree: number;
}

export interface Pattern {
	nodes: string[];
	type: string;
	confidence: number;
	metadata: Record<string, any>;
}

export class GraphAnalytics<T = any> {
	private clustering: GraphClustering<T>;

	constructor(private graph: Graph<T>) {
		this.clustering = new GraphClustering(graph);
	}

	calculateMetrics(): GraphMetrics {
		const nodes = this.graph.getAllNodes();
		const edges = this.graph.getAllEdges();
		
		return {
			centrality: this.calculateCentrality(),
			communities: this.detectCommunities(),
			clusters: this.clustering.findClusters(0.5),
			density: this.calculateDensity(nodes.length, edges.length),
			avgDegree: this.calculateAverageDegree(nodes.length, edges.length)
		};
	}

	private calculateCentrality(): Record<string, number> {
		const centrality: Record<string, number> = {};
		const nodes = this.graph.getAllNodes();
		
		nodes.forEach(node => {
			const neighbors = this.graph.getNeighbors(node.id);
			centrality[node.id] = neighbors.length;
		});

		return centrality;
	}

	private detectCommunities(): string[][] {
		// Simple community detection based on node type
		const communities: Map<string, string[]> = new Map();
		
		this.graph.getAllNodes().forEach(node => {
			const type = node.metadata.type || 'default';
			const community = communities.get(type) || [];
			community.push(node.id);
			communities.set(type, community);
		});

		return Array.from(communities.values());
	}

	private calculateDensity(nodeCount: number, edgeCount: number): number {
		if (nodeCount <= 1) return 0;
		const maxEdges = nodeCount * (nodeCount - 1);
		return edgeCount / maxEdges;
	}

	private calculateAverageDegree(nodeCount: number, edgeCount: number): number {
		if (nodeCount === 0) return 0;
		return (2 * edgeCount) / nodeCount;
	}

	findPatterns(): Pattern[] {
		const patterns: Pattern[] = [];
		const nodes = this.graph.getAllNodes();

		// Find temporal patterns
		const temporalPatterns = this.findTemporalPatterns();
		patterns.push(...temporalPatterns);

		// Find type-based patterns
		const typePatterns = this.findTypePatterns();
		patterns.push(...typePatterns);

		return patterns;
	}

	private findTemporalPatterns(): Pattern[] {
		const patterns: Pattern[] = [];
		const nodes = this.graph.getAllNodes()
			.sort((a, b) => new Date(a.metadata.timestamp).getTime() - new Date(b.metadata.timestamp).getTime());

		// Find sequences of related nodes
		for (let i = 0; i < nodes.length - 1; i++) {
			const current = nodes[i];
			const next = nodes[i + 1];
			const edges = this.graph.getEdges(current.id);
			
			if (edges.some(e => e.target === next.id)) {
				patterns.push({
					nodes: [current.id, next.id],
					type: 'temporal_sequence',
					confidence: 0.8,
					metadata: {
						timeGap: new Date(next.metadata.timestamp).getTime() - new Date(current.metadata.timestamp).getTime()
					}
				});
			}
		}

		return patterns;
	}

	private findTypePatterns(): Pattern[] {
		const patterns: Pattern[] = [];
		const typeGroups = new Map<string, GraphNode[]>();

		// Group nodes by type
		this.graph.getAllNodes().forEach(node => {
			const type = node.metadata.type;
			const group = typeGroups.get(type) || [];
			group.push(node);
			typeGroups.set(type, group);
		});

		// Find patterns within each type group
		typeGroups.forEach((nodes, type) => {
			if (nodes.length >= 2) {
				patterns.push({
					nodes: nodes.map(n => n.id),
					type: `type_cluster_${type}`,
					confidence: 0.7,
					metadata: {
						nodeCount: nodes.length,
						type
					}
				});
			}
		});

		return patterns;
	}
}