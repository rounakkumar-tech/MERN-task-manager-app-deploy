const express = require('express');
const app = express();

require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080;
const TaskRouter = require('./Routes/TaskRouter');
const cors = require('cors');

// Middleware - Order matters!
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello from the Server');
});

app.use('/tasks', TaskRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});