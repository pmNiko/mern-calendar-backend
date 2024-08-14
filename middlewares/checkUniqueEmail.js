import { User } from '../models/User.js';

export const checkUniqueEmail = async (req, res, next) => {
  const email = req.body.email;

  const emailExists = await User.findOne({ email });

  if (emailExists)
    return res
      .status(412)
      .json({ ok: false, msj: 'El email ya se encuentra registrado.' });

  next();
};
