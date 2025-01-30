export class TokenCleanup {
	private static readonly BATCH_SIZE = 1000;

	static async cleanupExpiredTokens() {
		// No-op: The in-memory store handles TTL automatically
		return;
	}

	private static async cleanupBlacklist() {
		// No-op: The in-memory store handles TTL automatically
		return;
	}

	static async cleanupExpiredSessions() {
		// No-op: The in-memory store handles TTL automatically
		return;
	}
}
