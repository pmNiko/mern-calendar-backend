import { Router } from 'express';
import controller from '../controllers/events.controller.js';
import checkSchema from '../middlewares/checkSchema.js';
import eventsSchema from '../schemas/events.schema.js';
import { checkToken } from '../middlewares/checkToken.js';

const router = Router();

router.use(checkToken);

router.get('/', [], controller.getEvents);
router.post('/', [eventsSchema.createSchema, checkSchema], controller.newEvent);
router.put('/:id', [], controller.updateEvent);
router.delete('/:id', [], controller.removeEvent);

export default router;
