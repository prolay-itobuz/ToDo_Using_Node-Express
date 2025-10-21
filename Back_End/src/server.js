import express from 'express'; // used because its express framework
import dotenv from 'dotenv'; // used because we use sensetive keys inside .env
import todoRoutes from './routes/routes.js'; // imported routes.js using any name , ex: 'x'
import authRoutes from './routes/authRoutes.js';
import cors from 'cors'; // for link backend and frontend
import connectDB from './config/db.js';
import loggerMiddleware from './validations/middlewares/logerMiddlewere.js';

dotenv.config();
const port = process.env.PORT;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

/* Routes */
app.use('/', todoRoutes); // use is a middleware
app.use('/user/auth', authRoutes); // handle user authentication

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    message: message,
    success: false,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
