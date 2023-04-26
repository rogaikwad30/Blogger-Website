const express = require('express');
const cors = require('cors');
const db = require('./services/mongodb');
const router = require('./routes/routes');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

const allowedOrigins = ['http://localhost:3000'];
const corsOptions = {
  origin: allowedOrigins,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use('/', router);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
