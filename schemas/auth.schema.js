import { checkSchema } from 'express-validator';

const userSchema = checkSchema({
  name: {
    errorMessage: 'El nombre es obligatorio.',
    exists: true,
    notEmpty: true,
  },
  email: {
    errorMessage: 'Debe ingresar un email válido.',
    isEmail: true,
    exists: true,
    notEmpty: true,
  },
  password: {
    isLength: {
      options: { min: 6 },
      errorMessage: 'El password debe contener 6 caracteres como minimo',
      exists: true,
      notEmpty: true,
    },
  },
});

const loginSchema = checkSchema({
  email: {
    errorMessage: 'Debe ingresar un email válido.',
    isEmail: true,
    exists: true,
    notEmpty: true,
  },
  password: {
    isLength: {
      options: { min: 6 },
      errorMessage: 'El password debe contener 6 caracteres como minimo',
      exists: true,
      notEmpty: true,
    },
  },
});

export default {
  userSchema,
  loginSchema,
};
