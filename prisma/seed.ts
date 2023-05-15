/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const firstPostId = '5c03994c-fc16-47e0-bd02-d218a370a078';
  const firstUserId = '5c03994c-fc16-47e0-bd02-d218a370a077';
  await prisma.user.upsert({
    where: {
      id: firstUserId,
    },
    create: {
      id: firstUserId,
      name: 'Alice',
    },
    update: {},
  });
  await prisma.post.upsert({
    where: {
      id: firstPostId,
    },
    create: {
      id: firstPostId,
      title: 'First Post',
      content: 'This is an example post generated from `prisma/seed.ts`',
      authorId: firstUserId,
    },
    update: {},
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
