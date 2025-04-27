const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./Routes/auth');
const TaskRoutes = require('./Routes/Taskroutes'); // Import TaskRoutes

dotenv.config();
console.log("MongoDB URI from .env:", process.env.MONGO_URL);

const app = express();

app.use(cors());
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000', // Add your frontend URL here
    methods: 'GET, POST',
};

app.use(cors(corsOptions)); 

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
    const port = process.env.PORT || 5000; // Use PORT from .env or default to 5000
    app.listen(port, () => console.log(`Backend running on port ${port}`));
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

app.use('/api/auth', authRoutes); // Use authRoutes for authentication endpoints
app.use('/api/Tasks', TaskRoutes); // Use TaskRoutes for task-related endpoints
