import { Joi, celebrate } from 'celebrate';
import { Router } from 'express';

import { createUser, login } from '../controllers/users';

const router = Router();

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(200),
      avatar: Joi.string().uri(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6)
    })
  }),
  createUser
);
router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6)
    })
  }),
  login
);

export default router;
