import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, type, occupation, email, cpf, rg, birthday, password } =
    request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    type,
    occupation,
    email,
    cpf,
    rg,
    birthday,
    password,
  });

  return response.json(user);
});

export default usersRouter;
