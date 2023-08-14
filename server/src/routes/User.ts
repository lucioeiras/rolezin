import { Router } from 'express'

import UserController from '../controllers/User'

const userRoutes = Router()

userRoutes.get('/user', (req, res) => UserController.get(req, res))
userRoutes.get('/user/:id', (req, res) => UserController.find(req, res))
userRoutes.post('/user', (req, res) => UserController.create(req, res))
userRoutes.put('/user/:id', (req, res) => UserController.update(req, res))
userRoutes.delete('/user/:id', (req, res) => UserController.delete(req, res))

export default userRoutes
