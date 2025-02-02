interface FetchOptions extends RequestInit {
	requireAuth?: boolean;
	timeout?: number;
	retries?: number;
	retryDelay?: number;
}

interface AuthTokens {
	accessToken: string;
	refreshToken: string;
	expiresIn: number;
}

const DEFAULT_TIMEOUT = 10000; // 10 seconds
const DEFAULT_RETRIES = 3;
const DEFAULT_RETRY_DELAY = 1000; // 1 second

async function getStoredTokens(): Promise<AuthTokens | null> {
	const tokens = localStorage.getItem('auth_tokens');
	return tokens ? JSON.parse(tokens) : null;
}

async function fetchWithTimeout(
	url: string,
	options: FetchOptions = {}
): Promise<Response> {
	const { timeout = DEFAULT_TIMEOUT } = options;

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), timeout);

	try {
		const response = await fetch(url, {
			...options,
			signal: controller.signal
		});
		return response;
	} finally {
		clearTimeout(timeoutId);
	}
}

async function refreshTokens(refreshToken: string): Promise<AuthTokens> {
	const response = await fetchWithTimeout('/api/auth/refresh', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ refreshToken }),
		timeout: 5000 // 5 seconds for token refresh
	});

	if (!response.ok) {
		throw new Error('Token refresh failed');
	}

	const tokens = await response.json();
	localStorage.setItem('auth_tokens', JSON.stringify(tokens));
	return tokens;
}

async function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchClient(url: string, options: FetchOptions = {}) {
	const {
		requireAuth = true,
		headers: initialHeaders = {},
		timeout = DEFAULT_TIMEOUT,
		retries = DEFAULT_RETRIES,
		retryDelay = DEFAULT_RETRY_DELAY,
		...rest
	} = options;

	let attempt = 0;
	while (attempt <= retries) {
		try {
			let requestHeaders = { ...initialHeaders };
			
			if (requireAuth) {
				let tokens = await getStoredTokens();
				if (!tokens) {
					throw new Error('No auth tokens found');
				}

				// Check if token needs refresh
				const expiresAt = new Date(tokens.expiresIn * 1000);
				if (expiresAt <= new Date()) {
					tokens = await refreshTokens(tokens.refreshToken);
				}

				requestHeaders = {
					...requestHeaders,
					Authorization: `Bearer ${tokens.accessToken}`
				};
			}

			const response = await fetchWithTimeout(url, {
				...rest,
				headers: {
					'Content-Type': 'application/json',
					...requestHeaders
				},
				timeout
			});

			if (!response.ok) {
				// Don't retry 4xx errors except for 429 (rate limit)
				if (response.status >= 400 && response.status < 500 && response.status !== 429) {
					const error = new Error('API request failed') as Error & { status?: number };
					error.status = response.status;
					throw error;
				}
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			return response.json();
		} catch (error) {
			attempt++;
			
			// Don't retry if we've hit the max retries
			if (attempt > retries) throw error;

			// Calculate exponential backoff delay
			const delay = retryDelay * Math.pow(2, attempt - 1);
			await sleep(delay);
		}
	}

	throw new Error('Max retries exceeded');
}