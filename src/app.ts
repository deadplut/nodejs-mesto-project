import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import path from 'path';

import auth from './middlewares/auth';
import { errorLogger, requestLogger } from './middlewares/logger';
import authRouter from './routes/auth';
import cardsRouter from './routes/cards';
import usersRouter from './routes/users';

const { errors } = require('celebrate');

dotenv.config();
const {
  PORT = 3000,
  BASE_PATH = '/',
  MONGO_URL = 'mongodb://localhost:27017/mestodb'
} = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(MONGO_URL)
  .then(() => console.log('Успешно подключились к MongoDB'))
  .catch((err) => console.error('Ошибка подключения к MongoDB:', err));

mongoose.set('strictQuery', true);

export interface CustomRequest extends Request {
  user?: {
    _id: string;
  };
}

app.use(requestLogger);

app.use('/', authRouter);
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use(errorLogger);

export interface CustomError extends Error {
  statusCode?: number;
}
app.use(errors());
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message
  });
});

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
  console.log(`Сервер запущен на http://localhost:${MONGO_URL}`);

  console.log('Gay на сервере');
  console.log(BASE_PATH);
});
