const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Server Work'));
app.use('/api/blockchain', require('./routes/blockchain'));

const port = process.env.PORT || 1000;

app.listen(port, () => console.log('It works'));