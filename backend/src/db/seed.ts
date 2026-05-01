import { db } from "./index";
import { users } from "./schema";

async function seed() {
  console.log("Seeding database...");

  await db.insert(users).values([
    { name: "Alice Johnson", email: "alice@example.com" },
    { name: "Bob Smith", email: "bob@example.com" },
    { name: "Carol White", email: "carol@example.com" },
  ]).onConflictDoNothing();

  console.log("Seeding complete.");
  process.exit(0);
}

seed();
