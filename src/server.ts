// const logger = require('./common/logging');
import 'module-alias/register';
import mongoose from 'mongoose';
import { PORT, MONGO_CONNECTION_STRING } from './common/config';
import app from './app';

mongoose
  .connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: false,
  })
  .catch(console.error);

const db = mongoose.connection;

// db.on('error', () => logger.error('MongoDB connection error:')).once(
//   'open',
//   () => {
//     logger.info('Successfully connect to DB');
//     app.listen(PORT, () =>
//       logger.info(`App is running on http://localhost:${PORT}`)
//     );
//   }
// );

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`));
});
