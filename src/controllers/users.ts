import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import { IncorrectDataError } from '../errors/incorrect_data_err';
import { NotFoundError } from '../errors/not-found-err';
import { CustomRequest } from 'app';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  return User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(next);
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  return User.findById(req.params.id)
    .select('name about avatar _id')
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      res.send({ data: user });
    })
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => {
      if (!user) {
        throw new IncorrectDataError(
          'Переданы некорректные данные при создании пользователя.'
        );
      }
      res.send({ data: user });
    })
    .catch(next);
};

export const updateUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, about } = req.body;
  const user = req.user?._id;

  return User.updateOne({ _id: user }, { name: name, about: about })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }

      if (!user.acknowledged) {
        throw new IncorrectDataError('Пользователь с указанным _id не найден.');
      }
      res.send({ data: user });
    })
    .catch(next);
};

export const updateUserAvatar = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { avatar } = req.body;
  const user = req.user?._id;

  return User.updateOne({ _id: user }, { avatar: avatar })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }

      if (!user.acknowledged) {
        throw new IncorrectDataError(
          'Переданы некорректные данные при обновлении аватара.'
        );
      }
      res.send({ data: user });
    })
    .catch(next);
};
