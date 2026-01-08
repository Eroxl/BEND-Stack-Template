FROM oven/bun AS build

WORKDIR /app

COPY package.json package.json
COPY bun.lock bun.lock

COPY app/package.json app/package.json
COPY backend/package.json backend/package.json

RUN bun install

COPY backend/src backend/src
COPY backend/tsconfig.json backend/tsconfig.json

WORKDIR /app/backend

ENV NODE_ENV=production

RUN bun build \
	--compile \
	--minify-whitespace \
	--minify-syntax \
	--outfile server \
	src/index.ts

FROM gcr.io/distroless/base

WORKDIR /backend

COPY --from=build /app/backend/server server

ENV NODE_ENV=production

CMD ["./server"]
