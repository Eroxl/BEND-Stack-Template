import { Elysia } from "elysia";
import { runMigrations } from "./db/migrate";

const PORT = process.env.PORT || 3000;

await runMigrations();

export const app = new Elysia().get("/", () => "Hello Elysia");
export type App = typeof app;

app.listen(PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
