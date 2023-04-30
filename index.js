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
        if (code === 0) {
            const npmInstall = spawn('npm', ['install'])
            npmInstall.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`)
            })

            npmInstall.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`)
            })

            npmInstall.on('close', (code) => {
                console.log(`child process exited with code ${code}`)
                res.send(`Git pull and npm install finished with code ${code}`)
            })
        } else {
            res.send(`Git pull failed with code ${code}`)
        }
    })
})

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

app.listen(3000, "0.0.0.0", () => {
    console.log('Server listening on port 3000');
});
