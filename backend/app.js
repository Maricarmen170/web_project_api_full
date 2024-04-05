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

// Opciones de CORS para permitir solicitudes de ciertos orígenes
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://api.apifull.mooo.com',
    'https://apifull.mooo.com',
    'https://www.apifull.mooo.com',
  ],
  credentials: true, // Para permitir cookies de sesión en las solicitudes entre dominios
  allowedHeaders: 'Content-Type, Authorization', // Para permitir el token de autorización en las solicitudes
  allowedMethods: 'GET, POST, PATCH, PUT, DELETE, OPTIONS', // Para permitir los métodos HTTP
};

// eslint-disable-next-line no-undef
app.use(cors(corsOptions));

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
