const { spawn } = require('child_process');
const path = require('path');

module.exports = async (req, res) => {
  const pythonProcess = spawn('python', [path.resolve('python/books_names.py')]);

  let dataBuffer = '';

  pythonProcess.stdout.on('data', (data) => {
    dataBuffer += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    res.status(500).send(data.toString());
  });

  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      res.status(500).send('Failed to get book names');
      return;
    }

    const booknames = dataBuffer.trim().split('\n');
    res.json({ booknames });
  });
};
