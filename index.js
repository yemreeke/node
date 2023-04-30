const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json({ message: 'Selam Yunus Emre' });
});

app.listen(3000, "0.0.0.0", () => {
    console.log('Server listening on port 3000');
});
