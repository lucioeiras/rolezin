import { Router } from 'express'

import user from './routes/user'
import auth from './routes/auth'
import organizer from './routes/organizer'
import event from './routes/event'
import purchase from './routes/purchase'
import friendship from './routes/friendship'

const routes = Router()

routes.use(user)
routes.use(auth)
routes.use(organizer)
routes.use(event)
routes.use(purchase)
routes.use(friendship)

export default routes
