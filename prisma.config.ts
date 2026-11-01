import "dotenv/config";
import path from "node:path";
import type { PrismaConfig } from "prisma";

export default {
  schema: path.join("prisma", "schema.prisma"),
  
  // ✅ Prisma 7: Database URL ab YAHAN define hoti hai
  migrations: {
    path: path.join("prisma", "migrations"),
  },
  
  datasource: {
    // Use DIRECT_URL (non-pooler) for migrations — Neon's pooler blocks advisory locks.
    // At runtime the app uses DATABASE_URL (pooler) via PrismaPg adapter in src/lib/prisma.ts.
    url: (process.env.DIRECT_URL ?? process.env.DATABASE_URL)!,
  },
} satisfies PrismaConfig;