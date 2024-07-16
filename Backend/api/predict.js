const { spawn } = require('child_process');
const path = require('path');

module.exports = async (req, res) => {
  const { bookName } = req.body;

  const pythonProcess = spawn('python', [path.resolve('python/predict.py'), bookName]);

  let predictionData = '';

  pythonProcess.stdout.on('data', (data) => {
    predictionData += data.toString();
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
    const predictions = predictionData.trim().split('\n');
    res.json({ predictions });
  });
};
