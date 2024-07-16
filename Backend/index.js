require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { spawn } = require('child_process');
const { predict } = require('./api/predict');
const { booknames } = require('./api/book_names');
const router = require('./Routes/bookpredictionsroutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use('/api',router);
app.get('/',(req,res)=>{
  res.send("This is working fine.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});