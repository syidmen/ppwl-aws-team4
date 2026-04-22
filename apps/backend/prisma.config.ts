import { defineConfig } from "prisma/config";
import "dotenv/config";

export default defineConfig({
  migrations: {
    seed: "bun ./prisma/seed.ts",
  },
  datasource: {
    url: "postgresql://postgres:ppwlteam4@monorepo-db.csxc40imi5ff.us-east-1.rds.amazonaws.com:5432/monorepo_prod",
  },
});