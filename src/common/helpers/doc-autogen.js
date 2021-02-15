/* eslint-disable */
const swaggerAutogen = require('swagger-autogen');
const converter = require('swagger2openapi');
const m2s = require('mongoose-to-swagger');
const PORT = require('../config').PORT;
const fs = require('fs');
const glob = require('glob');

const schemas = {};
glob.sync('**/*.model.ts').forEach(file => {
  const model = require('../../../' + file).default;
  const modelName = model.modelName;
  schemas[modelName] = m2s(model);
});

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

swaggerAutogen()(swagger2, endpoints, doc).catch(e => console.log(e));

const options = {};
converter.convertFile(swagger2, options, (err, data) => {
  if (err) throw err;
  const swagger3 = data.openapi;
  if (!swagger3.components) swagger3.components = {};
  swagger3.components.schemas = schemas;
  fs.writeFile(
    'doc/swagger.json',
    JSON.stringify(swagger3, null, 2),
    err => err && console.error(err)
  );
});
