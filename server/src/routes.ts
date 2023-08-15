import { Router } from 'express'

import user from './routes/user'
import auth from './routes/auth'

const routes = Router()

routes.use(user)
routes.use(auth)

export default routes
