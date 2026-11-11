import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

/** Handles Better Auth API requests in Next.js. */
export const { GET, POST } = toNextJsHandler(auth);