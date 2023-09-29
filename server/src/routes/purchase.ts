import { Router } from 'express'

import PurchaseController from '../controllers/purchase'

const purchaseRoutes = Router()

purchaseRoutes.get('/purchase/events/:userId', (req, res) =>
  PurchaseController.findEventsByUser(req, res),
)
purchaseRoutes.get('/purchase/users/:eventId', (req, res) =>
  PurchaseController.findUsersByEvent(req, res),
)

purchaseRoutes.post('/purchase', (req, res) =>
  PurchaseController.create(req, res),
)

export default purchaseRoutes
