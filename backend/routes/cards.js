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
router.put('/likes/:cardId', auth, likeCard);
router.delete('/likes/:cardId', auth, dislikeCard);
export default router;
