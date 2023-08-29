import { Router } from 'express'

import AuthController from '../controllers/auth'

const authRoutes = Router()

authRoutes.post('/user/login', (req, res) => AuthController.userLogin(req, res))
authRoutes.post('/organizer/login', (req, res) =>
  AuthController.organizerLogin(req, res),
)

export default authRoutes
