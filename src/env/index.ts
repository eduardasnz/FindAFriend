import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3232),
  NODE_ENV: z.enum(["dev", "production", "test"]).default("dev"),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string()
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("❌ Invalid environment variables");
  throw new Error("❌ Invalid environment variables");
}

export const env = _env.data;
