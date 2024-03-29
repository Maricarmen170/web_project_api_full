import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).send({ message: 'Se requiere autorización para ingresar' });
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, 'secret');

    if (!payload) {
      return res.status(403).send({ message: 'El token no es válido' });
    }
    req.user = payload;
    next();
    return req.user;
  } catch (err) {
    return res.status(403).send({ message: 'El token no es válido' });
  }
};
