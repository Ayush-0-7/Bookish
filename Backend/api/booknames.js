const { spawn } = require('child_process');
export const booknames = (req,res)=>{
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

}