import { Router } from 'express'

const routes = Router()

routes.get('/', (_, res) => {
  res.json({ message: 'Hello, World!' })
})

export default routes
