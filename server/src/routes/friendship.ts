import { Router } from 'express'

import FriendshipController from '../controllers/friendship'

const friendshipRoutes = Router()

friendshipRoutes.get('/user/friends/:id', (req, res) =>
  FriendshipController.findUserFriends(req, res),
)

friendshipRoutes.get('/user/notifications/:id', (req, res) =>
  FriendshipController.findNotifications(req, res),
)

friendshipRoutes.post('/friendship/ask', (req, res) =>
  FriendshipController.askForFriendship(req, res),
)

friendshipRoutes.post('/friendship/confirm', (req, res) =>
  FriendshipController.confirmFriendship(req, res),
)

friendshipRoutes.delete('/organizer/:id', (req, res) =>
  FriendshipController.delete(req, res),
)

export default friendshipRoutes
