import express from 'express';
import recipesController from './recipes.controller';

const router = express.Router();

router.route('/').get(recipesController.getAll).post(recipesController.add);

router
  .route('/:id')
  .get(recipesController.getById)
  .put(recipesController.replace)
  .delete(recipesController.remove);

export default router;
