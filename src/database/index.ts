import prisma from './prisma';

export const connectDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('📦 Database connected successfully');
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
};

export const disconnectDatabase = async () => {
  await prisma.$disconnect();
};

export default prisma;
