const { spawn } = require('child_process');
export const predict = (req, res) => {
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
  }