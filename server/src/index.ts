import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import routes from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(fileUpload())

app.use(routes)

app.listen(3333, () =>
  console.log('🚀 Server started at http://localhost:3333'),
)
