const express = require('express');
const { apiRouter } = require('./routes/index');
const { connectDB } = require('./config/db');
const cors = require('cors');

const app = express();


app.use(cors({
    origin: "todo-list-webapp-alpha.vercel.app",
    // origin: "http://localhost:5173",
    credentials: true,
}));


connectDB();
app.use(express.json());
app.use('/api', apiRouter);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
