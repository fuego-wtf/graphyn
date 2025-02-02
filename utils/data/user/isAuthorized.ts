"server only";

import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import config from "@/config";

export async function isAuthorized(userId: string) {
  if (!config?.auth?.enabled) {
    console.log("Auth is disabled");
    return { isAuthorized: true };
  }

  try {
    const data = await db.select().from(users).where(eq(users.userId, userId));
    return {
      isAuthorized: true,
      user: data?.[0]
    };
  } catch (error) {
    console.error("Error checking authorization:", error);
    return { isAuthorized: false };
  }
}

