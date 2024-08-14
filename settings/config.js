import 'dotenv/config.js';

const Environment = {
  PORT: process.env.PORT || 4000,
  DB_CNN: process.env.DB_CNN || '',
  JWT_PRIVATE: process.env.JWT_PRIVATE,
  JWT_PUBLIC: process.env.JWT_PUBLIC,
};

export const { PORT, DB_CNN, JWT_PRIVATE, JWT_PUBLIC } = Environment;
