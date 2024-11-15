import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import { Request, Response, NextFunction } from 'express';

dotenv.config();
const { PORT = 3000, BASE_PATH = '/sad' } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

export interface CustomRequest extends Request {
  user?: {
    _id: string;
  };
}

app.use((req: CustomRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: '6736175152c8f90bb3a29391'
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

export interface CustomError extends Error {
  statusCode?: number;
}

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message
  });
});

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
  console.log('Gay на сервере');
  console.log(BASE_PATH);
});
