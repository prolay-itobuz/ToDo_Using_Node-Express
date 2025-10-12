import express from 'express' // used because its express framework
import dotenv from 'dotenv' // used because we use sensetive keys inside .env
import x from './routes/routes.js' // imported routes.js using any name , ex: 'x'
import y from './routes/authRoutes.js'
import cors from 'cors' // for link backend and frontend
import connectDB from './config/db.js'

dotenv.config()
const port = process.env.PORT

connectDB()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/', x) // use is a middleware
app.use('/user/auth', y)  // handle user authentication

app.use((err, req, res,next) => {
  res.status(500).send({
    message: err.message,
    success: false,
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
