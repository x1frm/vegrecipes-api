import express from 'express';
import recipeRouter from './resources/recipes/recipe.router';

const router = express.Router();
router.use('/recipes', recipeRouter);

export default router;
