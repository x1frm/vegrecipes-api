import mongoose from 'mongoose';

export const dbInit = (): void => {
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
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

/**
* Remove all the data for all db collections.

module.exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany();
  }
}

*/
