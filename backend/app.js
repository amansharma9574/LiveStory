const express =  require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const dotenv = require('dotenv');
const cors = require('cors');
const authMiddleware = require('./middlewares/authMiddleware')
dotenv.config();

const app = express();

connectDB();

// Middleware
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5173', 'http://192.168.0.110:5173', 'https://4f5c-103-241-227-201.ngrok-free.app'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


// Routes
app.post('/api/signup', userRoutes);
app.post('/api/login', userRoutes);
app.post('/api/post', postRoutes);
app.post('/api/servepost',postRoutes);
app.post('/api/fullpost', authMiddleware, postRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
