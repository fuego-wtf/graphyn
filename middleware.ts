import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from "@clerk/nextjs";

export const runtime = 'nodejs'

export function customAuthMiddleware(request: NextRequest) {
	const ip = request.headers.get('x-forwarded-for') || 'anonymous';
	const path = request.nextUrl.pathname;
	const identifier = `${ip}:${path}`;
	console.log("client identifier:", identifier);
	// add any extra auth logic here before returning response
	return NextResponse.next();
}

export default authMiddleware({
	publicRoutes: ["/", "/sign-in", "/sign-up"],
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
