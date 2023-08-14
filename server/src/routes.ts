import { Router } from 'express'

import user from './routes/User'

const routes = Router()

routes.use(user)

export default routes
