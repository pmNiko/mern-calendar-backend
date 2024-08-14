import mongoose from 'mongoose';
import { DB_CNN } from '../settings/config.js';

export const dbConnection = async () => {
  try {
    await mongoose.connect(DB_CNN);

    console.log('Connected to Mongo');
  } catch (error) {
    console.log(error);
    throw new Error('Error connecting to MongoDB');
  }
};
