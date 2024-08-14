import { User } from '../models/User.js';
import { comparePassword, encryptPassword } from '../helpers/hashPassword.js';
import { jwt } from '../helpers/jwt.js';

const signUp = async (req, res, next) => {
  try {
    const user = new User(req.body);

    user.password = encryptPassword(user.password);
    // throw new Error('Error saving forced!');

    await user.save();

    const token = await jwt.sign(user._id, user.name);

    res.json({ ok: true, uid: user._id, name: user.name, token });
  } catch (error) {
    console.log(error);
    next({});
  }
};

const signIn = async (req, res, next) => {
  try {
    const password = req.body.password;
    const user = req.user;

    const validPassword = comparePassword(password, user.password);

    if (!validPassword)
      return res
        .status(403)
        .json({ ok: false, msg: 'Las credenciales no son correctas.' });

    const token = await jwt.sign(user._id, user.name);

    res.json({ ok: true, uid: user._id, name: user.name, token });
  } catch (error) {
    console.log(error);
    next({});
  }
};

const renew = async (req, res, next) => {
  try {
    const decoded = req.decoded;

    const token = await jwt.sign(decoded.uid, decoded.name);

    res.json({ ok: true, uid: decoded.uid, name: decoded.name, token });
  } catch (error) {
    console.log(error);
    next({});
  }
};

export default {
  signUp,
  signIn,
  renew,
};
