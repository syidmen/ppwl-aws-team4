FROM oven/bun:1 AS base
WORKDIR /app

# 1. Copy manifests & prisma schema dulu
COPY package.json bun.lock ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/shared/package.json ./packages/shared/
COPY apps/backend/prisma ./apps/backend/prisma/

# 2. Install dependencies (termasuk prisma engine)
RUN bun install

# 3. Copy SEMUA source code (Hanya di tahap ini kita boleh COPY)
COPY apps/backend ./apps/backend
COPY packages/shared ./packages/shared

# 4. HAPUS folder sampah yang baru saja ter-copy dari lokal
RUN rm -rf apps/backend/src/generated

# 5. GENERATE ULANG (Ini harus di tahap paling akhir sebelum CMD)
WORKDIR /app/apps/backend
RUN bunx prisma generate

EXPOSE 3000
CMD ["bun", "src/index.ts"]
