import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ DATABASE_URL is missing in .env. Please add the Supabase Pooler connection string.");
}

const pool = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }, // required for Supabase/AWS
});

pool
  .connect()
  .then(() => console.log("✅ Connected to Supabase PostgreSQL (via Pooler)"))
  .catch((err) => console.error("❌ Database connection error:", err.message));

export default pool;
