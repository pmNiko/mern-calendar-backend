import { Event } from '../models/Event.js';

const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find().populate('user', 'name');

    res.json({ ok: true, events });
  } catch (error) {
    console.log(error);
    next({});
  }
};

const newEvent = async (req, res, next) => {
  try {
    const event = new Event(req.body);

    event.user = req.decoded.uid;

    const eventSaved = await event.save();

    res.json({ ok: true, id: eventSaved.id });
  } catch (error) {
    console.log(error);
    next({});
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const eventID = req.params.id;
    const uid = req.decoded.uid;

    const eventFound = await Event.findById(eventID);

    if (!eventFound)
      return res
        .status(404)
        .json({ ok: false, msg: `El evento con ID ${eventID} no existe` });

    if (eventFound.user.toString() !== uid)
      return res.status(401).json({
        ok: false,
        msg: 'No cuenta con los privilegios para editar este evento',
      });

    const newEvent = { ...req.body, user: uid };

    const eventUpdate = await Event.findByIdAndUpdate(eventID, newEvent, {
      new: true,
    });

    res.json({ ok: true, id: eventUpdate });
  } catch (error) {
    console.log(error);
    next({});
  }
};

const removeEvent = async (req, res, next) => {
  try {
    const eventID = req.params.id;
    const uid = req.decoded.uid;

    const eventFound = await Event.findById(eventID);

    if (!eventFound)
      return res
        .status(404)
        .json({ ok: false, msg: `El evento con ID ${eventID} no existe` });

    if (eventFound.user.toString() !== uid)
      return res.status(401).json({
        ok: false,
        msg: 'No cuenta con los privilegios para eliminar este evento',
      });

    await Event.findOneAndDelete(eventID);

    res.json({ ok: true, id: eventID });
  } catch (error) {
    console.log(error);
    next({});
  }
};

export default {
  getEvents,
  newEvent,
  updateEvent,
  removeEvent,
};
