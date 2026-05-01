import { statSync } from "fs";
import { $ } from "bun";

const SCHEMA_PATH = "./src/db/schema.ts";
const POLL_INTERVAL_MS = 1000;

let running = false;

async function generateAndMigrate() {
  if (running) return;
  running = true;
  try {
    console.log("[db-watcher] Schema changed — generating migration...");
    await $`bunx drizzle-kit generate`;

    console.log("[db-watcher] Applying migration...");
    await $`bunx drizzle-kit migrate`;

    console.log("[db-watcher] Done.");
  } catch (e) {
    console.error("[db-watcher] Error:", e);
  }
  running = false;
}

let lastMtime = statSync(SCHEMA_PATH).mtimeMs;

// Apply any pending migrations on startup
await generateAndMigrate();

console.log(`[db-watcher] Watching ${SCHEMA_PATH} for changes...`);

setInterval(async () => {
  const { mtimeMs } = statSync(SCHEMA_PATH);
  if (mtimeMs !== lastMtime) {
    lastMtime = mtimeMs;
    await generateAndMigrate();
  }
}, POLL_INTERVAL_MS);
