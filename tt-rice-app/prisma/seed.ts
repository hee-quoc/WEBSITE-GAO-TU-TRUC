// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  const adminEmail = 'admin@example.com';
  const defaultPassword = 'password123'; // The administrator will change this

  // Hash the default password before storing it
  const hashedPassword = await hash(defaultPassword, 12);

  // Use `upsert` to create the user only if they don't exist
  // This makes the seed script safe to run multiple times.
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });