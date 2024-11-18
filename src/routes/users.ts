import { Joi, celebrate } from 'celebrate';
import { Router } from 'express';

import {
  getCurrentUser,
  getUser,
  getUsers,
  updateUser,
  updateUserAvatar
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.get(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex().required()
    })
  }),
  getUser
);
router.get('/me', getCurrentUser);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(200)
    })
  }),
  updateUser
);
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().uri()
    })
  }),
  updateUserAvatar
);

export default router;
