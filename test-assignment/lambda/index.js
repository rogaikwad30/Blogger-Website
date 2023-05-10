// const express = require('express');
// const cors = require('cors');
// const db = require('./services/mongodb');
// const router = require('./routes/routes');
// const bodyParser = require('body-parser');
// const config = require("./config.json");
// const app = express();
// const port = config.express_port;

// // const allowedOrigins = ['http://localhost:3000'];
// const corsOptions = {
//   origin: '*',
// };

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors(corsOptions));
// app.use('/', router);

// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });

// module.exports = app;

const awsServerlessExpress = require('aws-serverless-express');
const express = require('express');
const cors = require('cors');
const db = require('./services/mongodb');
const router = require('./routes/routes');
const bodyParser = require('body-parser');
const config = require("./config.json");
const app = express();
const port = config.express_port;

const corsOptions = {
  origin: '*',
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use('/', router);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

const server = awsServerlessExpress.createServer(app);

module.exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};
