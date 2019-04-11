const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Demo 1: Hello Awesome World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));