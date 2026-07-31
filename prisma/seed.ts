import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 12);

  await prisma.user.upsert({
    where: { email: 'admin@rentnest.com' },
    update: {},
    create: {
      email: 'admin@rentnest.com',
      name: 'System Admin',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });
}

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
