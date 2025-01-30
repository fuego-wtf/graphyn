import { SignJWT, jwtVerify } from 'jose'
import { nanoid } from 'nanoid'

export interface JWTPayload {
	jti: string
	sub: string
	iat: number
	exp: number
	type: 'access' | 'refresh'
}

const secret = new TextEncoder().encode(
	process.env.JWT_SECRET || 'default-secret-key-change-it'
)

export async function generateToken(
	userId: string,
	type: 'access' | 'refresh' = 'access'
): Promise<string> {
	const iat = Math.floor(Date.now() / 1000)
	const exp = iat + (type === 'access' ? 15 * 60 : 7 * 24 * 60 * 60) // 15 mins or 7 days

	return new SignJWT({ type })
		.setProtectedHeader({ alg: 'HS256' })
		.setJti(nanoid())
		.setIssuedAt(iat)
		.setExpirationTime(exp)
		.setSubject(userId)
		.sign(secret)
}

export async function verifyToken(token: string): Promise<JWTPayload> {
	const { payload } = await jwtVerify(token, secret) as unknown as { payload: JWTPayload };
	return payload;
}