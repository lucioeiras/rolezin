import 'dotenv/config'

import express from 'express'
import cors from 'cors'

import routes from './routes'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/uploads', express.static('temp/images'))

app.use(routes)

app.listen(3333, () =>
  console.log('🔥 Server started at http://localhost:3333'),
)
