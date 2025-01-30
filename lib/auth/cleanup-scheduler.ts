import { TokenCleanup } from './cleanup';

export class CleanupScheduler {
	private static cleanupInterval: NodeJS.Timer | null = null;
	private static readonly CLEANUP_INTERVAL = 60 * 60 * 1000; // 1 hour

	static startCleanupJob() {
		if (this.cleanupInterval) {
			return;
		}

		// Run cleanup immediately
		this.runCleanup();

		// Schedule periodic cleanup
		this.cleanupInterval = setInterval(() => {
			this.runCleanup();
		}, this.CLEANUP_INTERVAL);
	}

	static stopCleanupJob() {
		if (this.cleanupInterval) {
			clearInterval(this.cleanupInterval);
			this.cleanupInterval = null;
		}
	}

	private static async runCleanup() {
		try {
			console.log('Starting scheduled cleanup...');
			
			await Promise.all([
				TokenCleanup.cleanupExpiredTokens(),
				TokenCleanup.cleanupExpiredSessions()
			]);

			console.log('Scheduled cleanup completed');
		} catch (error) {
			console.error('Scheduled cleanup failed:', error);
		}
	}
}