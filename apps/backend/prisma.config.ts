import { defineConfig } from "tsdown"; export default defineConfig({ migrations: { seed: "bun ./prisma/seed.ts" } });
