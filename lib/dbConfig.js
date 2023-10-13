import mongoose from 'mongoose';

export const dbConnection = () => {
    mongoose.connect(process.env.DB_CONNECTION)
      .then(() => console.log('Connected to DB!'));
};