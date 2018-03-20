const express       = require("express");
const bodyParser    = require("body-parser");
const path          = require("path");
const http          = require("http");
const api           = require("./routes/api");
var cors            = require('cors');

const app = express();

//Parsers
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(cors());

app.use('/', api);

//set port
const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
