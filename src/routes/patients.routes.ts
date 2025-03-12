import { Router } from 'express';
import prisma from '../database/prisma';
import CreatePatientService from '../services/CreatePatientService';
import AppError from '../errors/AppError';

const patientsRouter = Router();

// Listar todos os pacientes
patientsRouter.get('/', async (request, response) => {
  const patients = await prisma.patient.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      cpf: true,
      phone: true,
      cep: true,
      street: true,
      number: true,
      complement: true,
      neighborhood: true,
      city: true,
      state: true,
      created_at: true,
    }
  });
  return response.json(patients);
});

// Criar novo paciente
patientsRouter.post('/', async (request, response) => {
  try {
    const { 
      firstName, 
      lastName, 
      cpf, 
      phone, 
      email, 
      password,
      cep,
      street,
      number,
      complement,
      neighborhood,
      city,
      state 
    } = request.body;

    const createPatient = new CreatePatientService();

    const patient = await createPatient.execute({
      firstName,
      lastName,
      cpf,
      phone,
      email,
      password,
      cep,
      street,
      number,
      complement,
      neighborhood,
      city,
      state
    });

    return response.json(patient);
  } catch (error: unknown) {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        userstatus: error.userstatus,
        message: error.message,
        ...(error.missingFields && { missingFields: error.missingFields })
      });
    }
    throw error;
  }
});

export default patientsRouter; 