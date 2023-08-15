import { Router } from 'express'

import AuthController from '../controllers/auth'

const authRoutes = Router()

authRoutes.post('/login', (req, res) => AuthController.login(req, res))

export default authRoutes
