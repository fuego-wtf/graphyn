import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { routes } from '@/config/routes';

export async function requireAuth() {
  const { userId } = auth();
  
  if (!userId) {
    redirect(`${routes.signIn}?mode=sign-in`);
  }

  return userId;
}

export async function redirectIfAuthenticated() {
  const { userId } = auth();
  
  if (userId) {
    redirect(`${routes.engine.overview}`);
  }
}
