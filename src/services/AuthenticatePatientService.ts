import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import prisma from '../database/prisma';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  patient: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  token: string;
}

class AuthenticatePatientService {
  public async execute({ email, password }: Request): Promise<Response> {
    const patient = await prisma.patient.findUnique({
      where: { email },
    });

    if (!patient) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await compare(password, patient.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, process.env.JWT_SECRET || 'default', {
      subject: patient.id,
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    });

    return {
      patient: {
        id: patient.id,
        firstName: patient.firstName,
        lastName: patient.lastName,
        email: patient.email,
      },
      token,
    };
  }
}

export default AuthenticatePatientService; 