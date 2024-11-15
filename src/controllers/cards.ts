import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import { IncorrectDataError } from '../errors/incorrect_data_err';
import { NotFoundError } from '../errors/not-found-err';
import { CustomRequest } from 'app';

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

export const deleteCard = (req: Request, res: Response, next: NextFunction) =>
  Card.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (result.deletedCount < 1) {
        throw new IncorrectDataError('Передан некорректный _id карточки.');
      } else if (result.acknowledged) {
        res.send({ message: 'Объект был удалён!' });
      }
    })
    .catch(next);

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
