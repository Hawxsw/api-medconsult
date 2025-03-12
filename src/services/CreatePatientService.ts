import { hash } from 'bcryptjs';
import prisma from '../database/prisma';
import AppError from '../errors/AppError';

interface Request {
  firstName: string;
  lastName: string;
  cpf: string;
  phone: string;
  email: string;
  password: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

class CreatePatientService {
  public async execute(data: Request) {
    const requiredFields = [
      'firstName',
      'lastName',
      'cpf',
      'phone',
      'email',
      'password',
      'cep',
      'street',
      'number',
      'neighborhood',
      'city',
      'state'
    ];

    const missingFields = requiredFields.filter(field => !data[field as keyof Request]);

    if (missingFields.length > 0) {
      throw new AppError({
        message: 'Missing required fields',
        userstatus: 'error',
        missingFields
      });
    }

    const checkPatientExists = await prisma.patient.findFirst({
      where: {
        OR: [
          { cpf: data.cpf },
          { email: data.email }
        ]
      }
    });

    if (checkPatientExists) {
      throw new AppError({
        message: 'Patient already exists with this CPF or email',
        userstatus: 'error'
      });
    }

    const hashedPassword = await hash(data.password, 8);

    const patient = await prisma.patient.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return {
      id: patient.id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      email: patient.email,
      cpf: patient.cpf,
      phone: patient.phone,
      cep: patient.cep,
      street: patient.street,
      number: patient.number,
      complement: patient.complement,
      neighborhood: patient.neighborhood,
      city: patient.city,
      state: patient.state,
      created_at: patient.created_at,
    };
  }
}

export default CreatePatientService; 