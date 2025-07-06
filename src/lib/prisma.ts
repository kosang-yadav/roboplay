import { PrismaClient } from "../generated/prisma";

// Add prisma to the global object to prevent multiple instantiations of PrismaClient
// in development mode (e.g., when Next.js HMR reloads modules).
declare global {
  var prisma: PrismaClient | undefined;
}

// Initialize PrismaClient if it's not already initialized globally.
// This ensures that only one instance of PrismaClient is created and reused across the application,
// especially important in development with hot-reloading frameworks like Next.js.
const client = globalThis.prisma || new PrismaClient();

// In development, store the PrismaClient instance globally.
// This prevents creating new connections on every hot-reload.
if (process.env.NODE_ENV === "development") {
  global.prisma = client;
}

export default client;
