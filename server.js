const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./Routes/auth');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000', // Add your frontend URL here
    methods: 'GET, POST',
  };
  
  app.use(cors(corsOptions)); 
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(5000, () => {
    console.log('Backend running on port 5000');
});
