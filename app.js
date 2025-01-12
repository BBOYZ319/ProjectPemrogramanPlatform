const express = require('express');
const logger = require ('./middlewares/logger');
const userRoutes = require ('./routes/userRouter');
require('dotenv').config()

const app = express();

app.use(express.json())
app.use(logger)
app.use('/users', userRoutes)
const PORT = process.env.PORT || 3000
app.listen (PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})