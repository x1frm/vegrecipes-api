/* eslint-disable */
const swaggerAutogen = require('swagger-autogen');
const converter = require('swagger2openapi');
const m2s = require('mongoose-to-swagger');
const recipe = require('../../resources/recipes/recipe.model.ts').default;
const PORT = require('../config').PORT;
const fs = require('fs');

const doc = {
  info: {
    title: 'Vegrecipes API',
    version: '0.0.1',
  },
  host: `localhost:${PORT}`,
  schemes: ['http'],
};

const swagger2 = 'doc/swagger-2.0.json';
const endpoints = ['src/router.ts'];

swaggerAutogen()(swagger2, endpoints, doc);

const options = {};
converter.convertFile(swagger2, options, (err, data) => {
  if (err) throw err;
  const swagger3 = data.openapi;
  if (!swagger3.components) swagger3.components = {};
  swagger3.components.schemas = { Recipe: m2s(recipe) };
  fs.writeFile('doc/swagger.json', JSON.stringify(swagger3), console.error);
});
