import { Router } from 'express'

import upload from '../config/multer'

import EventController from '../controllers/event'

const eventRoutes = Router()

eventRoutes.get('/event', (req, res) => EventController.get(req, res))
eventRoutes.get('/event/:id', (req, res) => EventController.find(req, res))
eventRoutes.get('/organizer/events/:organizerId', (req, res) =>
  EventController.findByOrganizer(req, res),
)
eventRoutes.post('/event', (req, res) => EventController.create(req, res))
eventRoutes.put('/event/:id', (req, res) => EventController.update(req, res))
eventRoutes.delete('/event/:id', (req, res) => EventController.delete(req, res))

eventRoutes.put('/event/image/:id', upload.single('image'), (req, res) =>
  EventController.updatePicture(req, res),
)

export default eventRoutes
