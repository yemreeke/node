const express = require('express');
const { spawn } = require('child_process')

const app = express();

app.post('/pull', (req, res) => {
    const gitPull = spawn('git', ['pull'])

    gitPull.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)
    })

    gitPull.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`)
    })

    gitPull.on('close', (code) => {
        console.log(`child process exited with code ${code}`)
        res.send(`Git pull finished with code ${code}`)
    })
})

app.get('/', (req, res) => {
    res.json({ message: 'Selam Emre' });
});

app.listen(3000, "0.0.0.0", () => {
    console.log('Server listening on port 3000');
});
