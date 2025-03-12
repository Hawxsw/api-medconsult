import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
// eslint-disable-next-line import/no-extraneous-dependencies
import cors from 'cors';

import configs from './configs/configs';
import routes from './routes';

import './database';
import AppError from './errors/AppError';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        userstatus: 'error',
        message: err.message,
      });
    }

    console.log(err);
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
);

app.listen(configs.port, () =>
  console.log(`Server is running in port: ${configs.port}`)
);
