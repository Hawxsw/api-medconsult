import { hash } from 'bcryptjs';
import prisma from '../database/prisma';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  type: string;
  occupation: string;
  email: string;
  cpf: string;
  rg: string;
  birthday: Date;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    type,
    occupation,
    email,
    cpf,
    rg,
    birthday,
    password,
  }: Request) {
    const checkUserExists = await prisma.user.findUnique({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        type,
        occupation,
        email,
        cpf,
        rg,
        birthday,
        password: hashedPassword,
      },
    });

    return user;
  }
}

export default CreateUserService;
