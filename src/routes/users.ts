import { Router } from 'express';

import {
  createUser,
  getUser,
  getUsers,
  login,
  updateUser,
  updateUserAvatar
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/signup', createUser);
router.post('/signin', login);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

export default router;
