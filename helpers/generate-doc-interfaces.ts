// This script is supposed to be run after each run of mongoose-tsgen
// It takes all %ModelName%Object types from mongoose.gen.ts
// And exports interfaces of mongoose documents
// They can be used to describe objects, which are passed to model constructors with new MyModel(obj: IMyModel)
import { uniq } from 'lodash';
import { writeFile, readFile } from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import prettier from 'prettier';

// eslint-disable-next-line @typescript-eslint/no-misused-promises
readFile('./src/interfaces/mongoose.gen.ts', 'utf-8', async (readErr, data) => {
  if (readErr) console.error(readErr);

  const typeNamesDup = data.match(/[A-Z]\w+Object/g);
  const typeNames = uniq(typeNamesDup);
  const exportStrings = typeNames.map(
    type => `export type I${type.slice(0, -6)} = OmitId<${type}>;`
  );

  const outputUnformatted = `
    import { ${typeNames.join(', ')} } from './mongoose.gen';\n
    type OmitId<T> = Omit<T, '_id'>;\n
    ${exportStrings.join('\n')}
  `;

  const options = (await prettier.resolveConfig('./prettierrc')) || {};
  const output = prettier.format(outputUnformatted, { ...options, parser: 'typescript' });

  writeFile('./src/interfaces/docs.ts', output, writeErr => {
    if (writeErr) console.error(writeErr);
    else console.log('Doc interfaces have been generated');
  });
});
