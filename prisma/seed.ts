import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const hashedPassword = await hash(adminPassword, 8);

  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@medclinic.com' },
    update: {},
    create: {
      name: process.env.ADMIN_NAME || 'Admin',
      email: process.env.ADMIN_EMAIL || 'admin@medclinic.com',
      password: hashedPassword,
      type: 'admin',
      occupation: 'Admin',
      cpf: '00000000000',
      rg: '0000000',
      birthday: new Date(),
    },
  });

  console.log('Admin user created:', admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
