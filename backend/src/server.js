require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/userFeedbackRoutes');
const connectDb = require('./config/mongoDb');
const app = express();
const port = process.env.PORT || 3000;
const seed = require('./seed')


connectDb();
seed();
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`app is listening on port http://localhost:${port}`);
});
