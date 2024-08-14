import { jwt } from '../helpers/jwt.js';

const jwtSchema = /^[B|b]earer\s\w+/;

export const checkToken = async (req, res, next) => {
  try {
    const authorization = req.headers['authorization'];

    if (!authorization)
      return res.status(401).json({ message: 'No autorizado!' });

    const validSchema = jwtSchema.test(authorization);

    if (!validSchema)
      return res.status(422).json({ message: 'Esquema de token invalido.' });

    const token = authorization.split(' ').pop();
    const decoded = await jwt.verify(token);

    req.decoded = decoded;

    next();
  } catch (error) {
    console.log(error);

    res.status(403).json({ message: 'El token es invalido.' });
  }
};
