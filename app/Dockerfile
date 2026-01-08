FROM oven/bun AS backend-types

WORKDIR /app

COPY package.json package.json
COPY bun.lock bun.lock

COPY app/package.json app/package.json
COPY backend/package.json backend/package.json
COPY backend/tsconfig.json backend/tsconfig.json
COPY backend/src backend/src

RUN bun install

WORKDIR /app/backend

RUN bun x tsc \
  --emitDeclarationOnly \
  --declaration \
  --outDir types

FROM oven/bun AS build

WORKDIR /app

COPY package.json package.json
COPY bun.lock bun.lock

COPY app/package.json app/package.json

COPY backend/package.json backend/package.json
COPY --from=backend-types /app/backend/types/src/ app/../backend/src/

RUN bun install

WORKDIR /app/app

COPY app/tsconfig.json .
COPY app/tailwind.config.ts .
COPY app/postcss.config.mjs .
COPY app/next.config.ts .

COPY app/src ./src
COPY app/public ./public

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN bun run build

EXPOSE 3000

CMD ["bun", "run", "start"]
