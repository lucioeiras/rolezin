import { Router } from 'express'

import upload from '../config/multer'

import UserController from '../controllers/user'

const userRoutes = Router()

userRoutes.get('/user', (req, res) => UserController.get(req, res))
userRoutes.get('/user/:id', (req, res) => UserController.find(req, res))
userRoutes.post('/user', (req, res) => UserController.create(req, res))
userRoutes.put('/user/:id', (req, res) => UserController.update(req, res))
userRoutes.delete('/user/:id', (req, res) => UserController.delete(req, res))

userRoutes.put('/user/photo/:id', upload.single('image'), (req, res) =>
  UserController.updatePicture(req, res),
)

export default userRoutes
