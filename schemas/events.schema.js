import { checkSchema } from 'express-validator';

import { isValidDate } from '../helpers/isValidDate.js';

const createSchema = checkSchema({
  title: {
    errorMessage: 'El titulo es obligatorio.',
    exists: true,
    notEmpty: true,
  },
  start: {
    errorMessage:
      'La fecha debe ser una fecha válida en formato de marca de tiempo',
    custom: { options: (value) => isValidDate(value) },
  },
  end: {
    errorMessage: 'La fecha de fin es obligatoria.',
    custom: { options: (value) => isValidDate(value) },
  },
});

export default {
  createSchema,
};
