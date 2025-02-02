import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: [
		"/",
		"/sign-in",
		"/sign-up",
		"/business-plan",
		"/api/webhook(.*)",
		"/engine",
		"/engine/agents",
		"/engine/agents/new"
	],
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
