import express from "express"; // used because its express framework
import dotenv from "dotenv" // used because we use sensetive keys inside .env
import x from './routes/routes.js';  // imported routes.js using any name , ex: 'x' 
import cors from "cors"; // for link backend and frontend

dotenv.config()
const port = process.env.PORT

const app = express()

app.use(cors());
app.use(express.json());

app.use('/', x); // use is a middleware


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})