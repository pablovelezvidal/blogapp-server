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

//app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', api);

//app.get('*', (req, res) => {
//    res.sendFile(path.join(__dirname, 'dist/index.html'));
//});

//set port
const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);


server.listen(port, () => console.log(`Running on localhost:${port}`));

//mlab info: mongodb://<dbuser>:<dbpassword>@ds247688.mlab.com:47688/blogapp
