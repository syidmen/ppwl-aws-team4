import { getPrisma } from './dbPostgres';

const prisma = getPrisma();

async function main() {
  const users = [
    { name: "Leo Tobing", email: "leo@example.com" },
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Smith", email: "jane@example.com" }
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }
}

main().finally(() => prisma.$disconnect())