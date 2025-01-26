const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 4000;

const dbConnection = require('./config/DataBaseConnection');
const { cloudinaryConnection } = require('./config/Cloudinary');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const userRoutes = require('./routers/User');
const taskRoutes = require('./routers/Task');
const feedRoutes = require('./routers/Feed');

dbConnection();
cloudinaryConnection();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp',
    limits: { fileSize: 2 * 1024 * 1024 },
    abortOnLimit: true,
  })
);


app.use('/api/auth', userRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/feed', feedRoutes);

app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Server is Started',
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong on the server',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
