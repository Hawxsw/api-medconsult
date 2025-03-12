import { Router } from 'express';
import AuthenticatePatientService from '../services/AuthenticatePatientService';

const patientSessionsRouter = Router();

patientSessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticatePatient = new AuthenticatePatientService();

  const { patient, token } = await authenticatePatient.execute({
    email,
    password,
  });

  return response.json({ patient, token });
});

export default patientSessionsRouter; 