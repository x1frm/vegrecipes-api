/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const swaggerAutogen = require('swagger-autogen');
const converter = require('swagger2openapi');
const m2s = require('mongoose-to-swagger');
const fs = require('fs');
const glob = require('glob');
const { PORT } = require('../src/common/config');

const schemas = {};

const doc = {
  info: {
    title: 'Vegrecipes API',
    version: '0.0.1',
  },
  host: `localhost:${PORT}`,
  schemes: ['http'],
};

const swaggerFile = 'swagger/swagger.json';
const endpoints = ['src/app.ts'];

glob('**/*.model.ts', async (globErr, files) => {
  if (globErr) console.error(globErr);

  files.forEach(file => {
    const model = require(`../${file}`).default;
    const { modelName } = model;
    schemas[modelName] = m2s(model);
  });

  swaggerAutogen()(swaggerFile, endpoints, doc)
    .then(() => {
      const options = {};

      converter.convertFile(swaggerFile, options, (converterErr, data) => {
        if (converterErr) throw converterErr;
        const swagger3 = data.openapi;
        if (!swagger3.components) swagger3.components = {};
        swagger3.components.schemas = schemas;

        fs.writeFile(swaggerFile, JSON.stringify(swagger3, null, 2), fsErr =>
          fsErr ? console.error(fsErr) : console.log('Swagger file has been written')
        );
      });
    })
    .catch(e => console.log(e));
});
