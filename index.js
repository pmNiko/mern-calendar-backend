import express from 'express';
import cors from 'cors';
import { dbConnection } from './database/config.js';
import { serverError } from './middlewares/serverError.js';
import { Paths } from './routes/paths.js';
import { PORT } from './settings/config.js';
import authRoutes from './routes/auth.js';
import eventsRoutes from './routes/events.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();
dbConnection();

app.use(cors());

app.use(express.static('public'));

app.use(express.json());

app.use(Paths.Auth, authRoutes);
app.use(Paths.Events, eventsRoutes);

app.use(serverError);

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => console.log('Server listening on port ', PORT));
