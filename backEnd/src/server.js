import express from 'express';
import configuration from './config/config.js';
import todoRoutes from './routes/todoRoutes.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import cors from 'cors';
import connectDB from './config/db.js';
import loggerMiddleware from './validations/middlewares/logerMiddlewere.js';

const port = configuration.PORT || 8000;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);
app.use('/userUploads', express.static('userUploads'));

app.get('/test', (req, res) => {
  res.send('Express App Responded');
});

app.use('/', todoRoutes);
app.use('/user/auth', authRoutes);
app.use('/user/profile', profileRoutes);

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
  console.log(`Todo app listening on port ${port}`);
});
