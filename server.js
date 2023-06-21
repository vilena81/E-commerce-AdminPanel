const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const { routes }= require('./routes/router')


app.use(express.json());
app.use(cors());


routes(app)


app.get('/', (req, res) => {
  const data = { message: 'Welcome to the registration page!' };
  res.json(data);
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});