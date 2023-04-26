const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000;

const allowedOrigins = ['http://localhost:3000'];

const corsOptions = {
  origin: allowedOrigins,
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
