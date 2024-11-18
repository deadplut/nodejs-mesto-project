import { Joi, celebrate } from 'celebrate';
import { Router } from 'express';

import {
  createCard,
  deleteCard,
  dislikeCard,
  getCards,
  likeCard
} from '../controllers/cards';

const router = Router();

router.get('/', getCards);
router.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24)
    })
  }),
  deleteCard
);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      linl: Joi.string().required()
    })
  }),
  createCard
);
router.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required()
    })
  }),
  likeCard
);
router.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required()
    })
  }),
  dislikeCard
);

export default router;
