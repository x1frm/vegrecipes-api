/* eslint-disable */
const swaggerAutogen = require('swagger-autogen');
const converter = require('swagger2openapi');
const m2s = require('mongoose-to-swagger');
const PORT = require('../src/common/config').PORT;
const fs = require('fs');
const glob = require('glob');

const schemas = {};

const doc = {
  info: {
    title: 'Vegrecipes API',
    version: '0.0.1',
  },
  host: `localhost:${PORT}`,
  schemes: ['http'],
};

const swaggerFile = 'doc/swagger.json';
const endpoints = ['src/app.ts'];

glob('**/*.model.ts', async (err, files) => {
  if (err) console.error(err);

  files.forEach(file => {
    const model = require('../' + file).default;
    const modelName = model.modelName;
    schemas[modelName] = m2s(model);
  });

  swaggerAutogen()(swaggerFile, endpoints, doc)
    .then(() => {
      const options = {};

      converter.convertFile(swaggerFile, options, (err, data) => {
        if (err) throw err;
        const swagger3 = data.openapi;
        if (!swagger3.components) swagger3.components = {};
        swagger3.components.schemas = schemas;

        fs.writeFile(
          swaggerFile,
          JSON.stringify(swagger3, null, 2),
          err => err && console.error(err)
        );
      });
    })
    .catch(e => console.log(e));
});
