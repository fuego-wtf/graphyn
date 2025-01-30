import { CleanupScheduler } from './auth/cleanup-scheduler';

class Startup {
	private static initialized = false;

	static initialize() {
		if (this.initialized) {
			return;
		}

		// Start cleanup scheduler
		CleanupScheduler.startCleanupJob();

		// Add shutdown handler
		process.on('SIGTERM', () => {
			this.shutdown();
		});

		process.on('SIGINT', () => {
			this.shutdown();
		});

		this.initialized = true;
		console.log('Application startup completed');
	}

	static shutdown() {
		// Stop cleanup scheduler
		CleanupScheduler.stopCleanupJob();
		console.log('Application shutdown completed');
		process.exit(0);
	}
}

// Initialize on module load if in production
// In development, this will run on each file change
if (process.env.NODE_ENV === 'production') {
	Startup.initialize();
}

export { Startup };