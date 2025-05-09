// server.js (excerpt)
const express = require('express');
const app = express();
const cors = require('cors')
const userRoutes = require('./src/routes/userRoutes');
const videoRoutes = require('./src/routes/videoRoutes');
const commentRoutes = require('./src/routes/commentRoutes');
const apiLimiter = require('./src/middleware/rateLimiter');
const authRoutes = require('./src/routes/authRoutes');  // the file you made
const dotenv = require('dotenv');
const path = require('path');

// Enable CORS for all routes
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const connectDB = require('./src/config/db');
dotenv.config();
connectDB();

// ... (connect to MongoDB with mongoose.connect here) ...

app.use(express.json());  // body parser for JSON
app.use('/assessment02/api/auth', authRoutes);
app.use('/assessment02/api/', apiLimiter);
// Mount routers (group under /assessment02/api as base path)
app.use('/assessment02/api/users', userRoutes);
app.use('/assessment02/api/videos', videoRoutes);
// The commentRoutes will be used both standalone and nested:
app.use('/assessment02/api/comments', commentRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
