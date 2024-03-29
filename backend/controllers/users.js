import bcrypt from 'bcryptjs';
import User from '../models/users.js';
import { generateAuthToken } from '../utils/utils.js';

export const getUsers = async (req, res) => {
  try {
    const userList = await User.find();
    res.send({ data: userList });
  } catch (err) {
    console.log(err);
  }
};

export const getUserById = async (req, res) => {
  const { _id: userId } = req.user;
  try {
    const getUser = await User.findById(userId).orFail();
    return res.status(200).send({ data: getUser });
  } catch (err) {
    return res.status(500).send({ message: 'Ha ocurrido un error en el servidor al buscar el usuario' });
  }
};

const isUserExist = async (email) => {
  let user;
  try {
    user = await User.findOne({ email });
  } catch (err) {
    return new Error('Ha ocurrido un error en el servidor al buscar el usuario');
  }
  return !!user;
};

const hashPassword = async (password) => bcrypt.hash(password, 10);

// Crear usuario
export const createUser = async (req, res) => {
  try {
    const {
      name, email, password, about, avatar,
    } = req.body;

    const userExist = await isUserExist(email);
    if (userExist) {
      return res.status(409).send({ message: 'El usuario con ese email ya existe' });
    }
    const passwordHash = await hashPassword(password);
    const newUser = await User.create({
      name,
      email,
      password: passwordHash,
      about,
      avatar,
    });
    return res.status(201).send({ data: newUser });
  } catch (err) {
    if (err.name === 'ValidatorError') {
      return res.status(400).send({ message: 'se pasaron datos incorrectos' });
    }
    return res.status(500).send({ message: 'Error al crear el usuario ne el servidor' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserWithCredentials(email, password);

    if (user && (user instanceof Error || user === 'email o contraseña incorrectas')) {
      return res.status(403).send({ message: user.message });
    }
    const token = await generateAuthToken(user);

    return res.status(200).send({ token });
  } catch (err) {
    return res.status(401).send({ message: err.message, details: err });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true },
    ).orFail();
    return res.status(201).json(updatedUser);
  } catch (err) {
    return res.status(400).send({ message: 'Error al actualizar perfil de usuario' });
  }
};

export const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const updatedAvatar = await User
      .findByIdAndUpdate(req.user._id, { avatar }, { new: true }).orFail();
    return res.send({ data: updatedAvatar });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'ID con formato incorrecto' });
    }
    if (err.name === 'DocumentNotFound') {
      return res.status(404).send({ message: 'No se ha encontrado un usuario con ese ID' });
    }
  }
  return res.status(400).send({ message: 'Ha ocurrido un error en el servidor' });
};

export const getUserInfo = async (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id).then((user) => res.send({ data: user })).catch(next);
};
