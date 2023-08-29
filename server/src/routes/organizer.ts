import { Router } from 'express'

import upload from '../config/multer'

import OrganizerController from '../controllers/organizer'

const organizerRoutes = Router()

organizerRoutes.get('/organizer', (req, res) =>
  OrganizerController.get(req, res),
)

organizerRoutes.get('/organizer/:id', (req, res) =>
  OrganizerController.find(req, res),
)

organizerRoutes.post('/organizer', (req, res) =>
  OrganizerController.create(req, res),
)

organizerRoutes.put('/organizer/:id', (req, res) =>
  OrganizerController.update(req, res),
)

organizerRoutes.delete('/organizer/:id', (req, res) =>
  OrganizerController.delete(req, res),
)

organizerRoutes.put(
  '/organizer/photo/:id',
  upload.single('image'),
  (req, res) => OrganizerController.updatePicture(req, res),
)

organizerRoutes.put(
  '/organizer/thumb/:id',
  upload.single('image'),
  (req, res) => OrganizerController.updateThumbnail(req, res),
)

export default organizerRoutes
