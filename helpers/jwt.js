import JWT from 'jsonwebtoken';
import { JWT_PRIVATE, JWT_PUBLIC } from '../settings/config.js';

/** Opciones para la configuración del token  */
const options = { expiresIn: '2h', algorithm: 'RS256' };

/** Creación del token de sesión */
const sign = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    const token = JWT.sign(payload, JWT_PRIVATE, options);

    if (!token) reject(token);

    resolve(token);
  });
};

/** Verificación del token de sesión */
const verify = (payload) => {
  return new Promise((resolve, _reject) => {
    const isValid = JWT.verify(payload, JWT_PUBLIC);

    resolve(isValid);
  });
};

export const jwt = {
  sign,
  verify,
};
