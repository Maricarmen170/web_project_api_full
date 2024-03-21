import express from 'express';
import {
  getCards,
  postCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} from '../controllers/cards.js';

import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getCards);
router.post('/', auth, postCard);
router.delete('/:_id', auth, deleteCardById);
router.put(':cardId/likes', auth, likeCard);
router.delete(':cardId/likes', auth, dislikeCard);
export default router;
