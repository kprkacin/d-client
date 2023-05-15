// @ts-check
/**
 * This file is included in `/next.config.js` which ensures the app isn't built with invalid env vars.
 * It has to be a `.js`-file to be imported there.
 */
/* eslint-disable @typescript-eslint/no-var-requires */
// const { z } = require('zod');

// /*eslint sort-keys: "error"*/
// const envSchema = z.object({
//   VERCEL="1"
// VERCEL_ENV="development"
// TURBO_REMOTE_ONLY="true"
// NX_DAEMON="false"
// VERCEL_URL=""
// VERCEL_GIT_PROVIDER=""
// VERCEL_GIT_PREVIOUS_SHA=""
// VERCEL_GIT_REPO_SLUG=""
// VERCEL_GIT_REPO_OWNER=""
// VERCEL_GIT_REPO_ID=""
// VERCEL_GIT_COMMIT_REF=""
// VERCEL_GIT_COMMIT_SHA=""
// VERCEL_GIT_COMMIT_MESSAGE=""
// VERCEL_GIT_COMMIT_AUTHOR_LOGIN=""
// VERCEL_GIT_COMMIT_AUTHOR_NAME=""
// VERCEL_GIT_PULL_REQUEST_ID=""
// VERCEL_ANALYTICS_ID="1Offy9c0VxtyFs9D09AGQs31sIt"
// POSTGRES_URL="postgres://default:bZoj0f6HUPOQ@ep-holy-bird-449885-pooler.eu-central-1.postgres.vercel-storage.com/verceldb"
// POSTGRES_URL_NON_POOLING="postgres://default:bZoj0f6HUPOQ@ep-holy-bird-449885.eu-central-1.postgres.vercel-storage.com/verceldb"
// POSTGRES_PRISMA_URL="postgres://default:bZoj0f6HUPOQ@ep-holy-bird-449885-pooler.eu-central-1.postgres.vercel-storage.com/verceldb?pgbouncer=true&connect_timeout=15"
// POSTGRES_USER="default"
// POSTGRES_HOST="ep-holy-bird-449885-pooler.eu-central-1.postgres.vercel-storage.com"
// POSTGRES_PASSWORD="bZoj0f6HUPOQ"
// POSTGRES_DATABASE="verceldb"
// GITHUB_ID="4195d227a20a4032a648"
// GITHUB_SECRET="eba8dc9d3b48af99c9e660a195bf4b3ab5ab2cf8"
// NEXTAUTH_URL="http://localhost:3000/api/auth"

//   DATABASE_URL: z.string().url(),
//   NODE_ENV: z.enum(['development', 'test', 'production']),
// });

// const env = envSchema.safeParse(process.env);

// if (!env.success) {
//   console.error(
//     '❌ Invalid environment variables:',
//     JSON.stringify(env.error.format(), null, 4),
//   );
//   process.exit(1);
// }
module.exports.env = env.data;
