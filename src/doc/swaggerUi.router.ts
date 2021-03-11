import swaggerUi, { JsonObject } from 'swagger-ui-express';
import express from 'express';
import fs from 'fs';

const router = express.Router();

router.use('/', swaggerUi.serve).get('/', (...args) => {
  fs.readFile('doc/swagger.json', (err, data) => {
    if (err) throw err;
    const swaggerDocument = JSON.parse(data.toString()) as JsonObject;
    swaggerUi.setup(swaggerDocument)(...args);
  });
});

export default router;
