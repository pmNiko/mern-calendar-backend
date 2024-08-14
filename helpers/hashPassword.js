import bcrypt from 'bcryptjs';

export const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (password1, password2) => {
  return bcrypt.compareSync(password1, password2);
};
