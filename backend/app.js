/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import users from './routes/users.js';
import cards from './routes/cards.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import { createUser, login } from './controllers/users.js';

const { PORT = 3000 } = process.env;
const app = express();

// Middleware para analizar el cuerpo de la solicitud en formato JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/aroundb')
  .then(() => {
    console.log('Conexion a MongoDB exitosa');
  })
  .catch((err) => {
    console.log(`Error al conectar ${err}`);
  });

app.post('/signup', (req, res) => {
  createUser(req, res);
});

app.post('/signin', (req, res) => {
  login(req, res);
});

app.use(requestLogger);

app.use('/users', users);
app.use('/cards', cards);
app.use(errorLogger);

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Bienvenido a la aplicacion' });
});

app.listen(PORT, () => {
  console.log('la aplicacion esta corriendo');
});
