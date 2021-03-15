import express from 'express';
import * as recipesService from './recipes.service';

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Get All Recipes'
    const recipes = await recipesService.getAll();
    res.status(200).json(recipes);
  })
  .post(async (req, res) => {
    // #swagger.tags = ['Recipes']
    /* #swagger.parameters['obj'] = { 
        in: 'body',
        description: "Recipe data.",
        schema: { $ref: "#/components/schemas/Recipe" }
    } */
    const recipe = await recipesService.add(req.body);
    res.status(200).json(recipe);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    // #swagger.tags = ['Recipes']
    const recipe = await recipesService.getById(req.params.id);
    return recipe ? res.status(200).json(recipe) : res.status(404).json('recipe not found');
  })
  .put(async (req, res) => {
    // #swagger.tags = ['Recipes']
    /* #swagger.parameters['obj'] = { 
        in: 'body',
        description: "Recipe data.",
        schema: { $ref: "#/components/schemas/Recipe" }
    } */
    const recipe = await recipesService.upd(req.params.id, req.body);
    res.status(200).json(recipe);
  })
  .delete(async (req, res) => {
    // #swagger.tags = ['Recipes']
    const isDeleted = await recipesService.del(req.params.id);
    return isDeleted ? res.status(204).send() : res.status(404).send();
  });

export default router;
