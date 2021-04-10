const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => res.send('Server Work'));
app.use('/api/user', require('./routes/user'));
app.use('/api/blockchain', require('./routes/blockchain'));

const port = process.env.PORT || 1000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, () => console.log('Database Connected'));
    })
    .catch(err => {
        console.log(err);
    });  