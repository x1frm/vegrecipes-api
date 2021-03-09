import express from 'express';
import * as ingredientsService from './ingredient.service';

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    // #swagger.tags = ['Ingredients']
    // #swagger.summary = 'Get All Ingredients'
    const ingredients = await ingredientsService.getAll();
    res.status(200).json(ingredients);
  })
  .post(async (req, res) => {
    // #swagger.tags = ['Ingredients']
    /* #swagger.parameters['obj'] = { 
        in: 'body',
        description: "Ingredient data.",
        schema: { $ref: "#/components/schemas/Ingredient" }
    } */
    const ingredient = await ingredientsService.add(req.body);
    res.status(200).json(ingredient);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    // #swagger.tags = ['Ingredients']
    const ingredient = await ingredientsService.getById(req.params.id);
    return ingredient
      ? res.status(200).json(ingredient)
      : res.status(404).json('ingredient not found');
  })
  .put(async (req, res) => {
    // #swagger.tags = ['Ingredients']
    /* #swagger.parameters['obj'] = { 
        in: 'body',
        description: "Ingredient data.",
        schema: { $ref: "#/components/schemas/Ingredient" }
    } */
    const ingredient = await ingredientsService.upd(req.params.id, req.body);
    res.status(200).json(ingredient);
  })
  .delete(async (req, res) => {
    // #swagger.tags = ['Ingredients']
    const isDeleted = await ingredientsService.del(req.params.id);
    return isDeleted ? res.status(204).send() : res.status(404).send();
  });

export default router;
