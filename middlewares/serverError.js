const defaultError =
  'Ha ocurrido un error por favor hable con el administrador.';

export const serverError = async (error, _req, res, _next) => {
  //   console.log('Ha ocurrido un error ', error.message);
  res.status(500).json({ ok: false, message: error.message || defaultError });
};
