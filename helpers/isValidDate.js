import moment from 'moment';

export const isValidDate = (value) => {
  if (!value) return false;

  const date = moment(value);

  return date.isValid();
};
