const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/predict', (req, res) => {
  const { bookName } = req.body;

  // Spawn a child process to run the Python script
  const pythonProcess = spawn('python', ['python/predict.py', bookName]);

  let predictionData = '';

  pythonProcess.stdout.on('data', (data) => {
    predictionData += data;
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    res.status(500).send(data.toString());
  });

  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      res.status(500).send('Failed to get prediction');
      return;
    }
    const predictions = predictionData.trim().split('\n');  // Split output by lines
    res.json({ predictions });
  });
});
app.get('/booknames',(req,res)=>{
    const pythonProcess1 = spawn('python', ['python/books_names.py']);
    let dataBuffer = '';

    pythonProcess1.stdout.on('data', (data) => {
      dataBuffer += data.toString();
    });
  
    pythonProcess1.stderr.on('data',(data)=>{
        console.error(`stderr:${data}`);
    })
    pythonProcess1.on('close', (code) => {
        if (code !== 0) {
          res.status(500).send('Failed to get book names');
          return;
        }
    
        const booknames = dataBuffer.trim().split('\n');
        res.json({ booknames });
      });

})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});