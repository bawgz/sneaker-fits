const express = require('express');
const bodyParser = require('body-parser');
const router = require('./app/routes');

const app = express();
const port = 8080;

app.use(bodyParser.json());

app.use('/', router);

app.listen(port, () => console.log(`App listening on port ${port}!`))
