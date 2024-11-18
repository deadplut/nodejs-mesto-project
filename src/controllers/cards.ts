import { CustomRequest } from 'app';
import { NextFunction, Request, Response } from 'express';

import { ForbiddenError } from '../errors/forbidden_error';
import { IncorrectDataError } from '../errors/incorrect_data_err';
import { NotFoundError } from '../errors/not-found-err';
import Card from '../models/card';

export const getCards = (req: Request, res: Response, next: NextFunction) =>
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);

export const createCard = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, link } = req.body;
  const user = req.user?._id;
  return Card.create({ name, link, owner: user })
    .then((card) => {
      if (!card) {
        throw new IncorrectDataError(
          'Переданы некорректные данные при создании карточки.'
        );
      }
      res.send({ data: card });
    })
    .catch(next);
};

export const deleteCard = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  Card.findById({ _id: req.params.id })
    .then((card) => {
      if (!card) {
        throw new IncorrectDataError('Передан некорректный _id карточки.');
      }

      if (card.owner.toString() !== req.user?._id.toString()) {
        throw new ForbiddenError(
          'Вы не можете удалить эту карточку, так как не являетесь её владельцем.'
        );
      }
      return Card.deleteOne({ _id: req.params.id });
    })
    .then((result) => {
      if (result.deletedCount < 1) {
        throw new IncorrectDataError('Передан некорректный _id карточки.');
      } else if (result.acknowledged) {
        res.send({ message: 'Объект был удалён!' });
      }
    })
    .catch(next);
};

export const likeCard = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user?._id } },
    { new: true }
  )
    .then((updatedCard) => {
      if (!updatedCard) {
        throw new IncorrectDataError(
          'Переданы некорректные данные для постановки/снятия лайка или некорректный _id карточки.'
        );
      }
      res.send({ message: 'Лайк поставлен!' });
    })
    .catch(next);

export const dislikeCard = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user?._id } },
    { new: true }
  )
    .then((updatedCard) => {
      if (!updatedCard) {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      }
      res.send({ message: 'Лайк убран!' });
    })
    .catch(next);
