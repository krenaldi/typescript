// const express = require('express');
// const router = express.Router();
import { Router } from 'express';

import { createTodo, getTodos, updateTodos, deleteTodo } from '../controllers/todos';

const router = Router();

router.post('/', createTodo);

router.get('/', getTodos);

router.patch('/:id', updateTodos);

router.delete('/:id', deleteTodo);

export default router;
