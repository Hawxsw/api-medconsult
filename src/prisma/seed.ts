import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const hashedPassword = await hash(adminPassword, 8);

  const admin = await prisma.doctor.upsert({
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

  const permissions = [
    { name: 'view_patients', description: 'Visualizar pacientes' },
    { name: 'edit_patients', description: 'Editar pacientes' },
    { name: 'view_appointments', description: 'Visualizar consultas' },
    { name: 'create_appointments', description: 'Criar consultas' },
    { name: 'cancel_appointments', description: 'Cancelar consultas' },
    { name: 'view_medical_records', description: 'Visualizar prontuários' },
    { name: 'edit_medical_records', description: 'Editar prontuários' },
    { name: 'prescribe_medication', description: 'Prescrever medicamentos' },
  ];

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { name: permission.name },
      update: {},
      create: permission,
    });
  }

  console.log('Permissions created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
