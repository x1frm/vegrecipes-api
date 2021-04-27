import mongoose from 'mongoose';
import { OverloadedReturnType } from 'src/common/types';

export const clearDatabase = async (): Promise<
  OverloadedReturnType<typeof mongoose.Collection.deleteMany[]>
> => {
  const { collections } = mongoose.connection;

  return Promise.all(Object.values(collections).map(async c => c.deleteMany({})));
};

export const dbInit = (): void => {
  mongoose.set('returnOriginal', false);

  mongoose.connect(
    process.env.MONGO_URL as string,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      autoIndex: false,
    },
    err => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    }
  );
};

export const dbClose = async (): Promise<void> => {
  await clearDatabase();
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};
