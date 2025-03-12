import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import patientsRouter from './patients.routes';
import patientSessionsRouter from './patient.sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/patients', patientsRouter);
routes.use('/patients/sessions', patientSessionsRouter);

export default routes;
