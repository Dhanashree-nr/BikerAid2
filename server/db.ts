// import { Pool, neonConfig } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-serverless';
// import ws from "ws";
// import * as schema from "@shared/schema";

// neonConfig.webSocketConstructor = ws;

// if (!process.env.DATABASE_URL) {
//   throw new Error(
//     "DATABASE_URL must be set. Did you forget to provision a database?",
//   );
// }

// export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// export const db = drizzle({ client: pool, schema });



import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../shared/schema"; // adjust if schema path differs

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Please check Railway variables.");
}

const client = postgres(process.env.DATABASE_URL, {
  ssl: 'require', // Railway requires this for secure connection
});

export const db = drizzle(client, { schema });
