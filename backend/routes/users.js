import express from 'express';
import {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getUserInfo,
} from '../controllers/users.js';

import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getUsers);

router.get('/me', auth, getUserById);
router.get('/me', getUserInfo);
router.patch('/me', auth, updateUser);
router.patch('/me/avatar', auth, updateAvatar);

export default router;
