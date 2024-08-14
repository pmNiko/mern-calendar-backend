import { Router } from 'express';
import constroller from '../controllers/auth.controller.js';
import autSchemas from '../schemas/auth.schema.js';
import checkSchema from '../middlewares/checkSchema.js';
import { checkUniqueEmail } from '../middlewares/checkUniqueEmail.js';
import { checkUserExist } from '../middlewares/checkUserExist.js';
import { checkToken } from '../middlewares/checkToken.js';

const router = Router();

router.post(
  '/new',
  [autSchemas.userSchema, checkSchema, checkUniqueEmail],
  constroller.signUp
);

router.post(
  '/',
  [autSchemas.loginSchema, checkSchema, checkUserExist],
  constroller.signIn
);
router.post('/renew', checkToken, constroller.renew);

export default router;
