import { User } from '../models/User.js';

export const checkUserExist = async (req, res, next) => {
  const email = req.body.email;

  const emailExists = await User.findOne({ email });

  if (!emailExists)
    return res.status(412).json({
      ok: false,
      msj: 'No existe un usuario registrado con ese email.',
    });

  req.user = emailExists;

  next();
};
