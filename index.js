import express from 'express';
import cors from 'cors';
import { dbConnection } from './database/config.js';
import { serverError } from './middlewares/serverError.js';
import { Paths } from './routes/paths.js';
import { PORT } from './settings/config.js';
import authRoutes from './routes/auth.js';
import eventsRoutes from './routes/events.js';

const app = express();
dbConnection();

app.use(cors());

app.use(express.static('public'));

app.use(express.json());

app.use(Paths.Auth, authRoutes);
app.use(Paths.Events, eventsRoutes);

app.use(serverError);

app.listen(PORT, () => console.log('Server listening on port ', PORT));
