const app = require('express')();
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');
let cookieParser = require('cookie-parser');
const config = JSON.parse(fs.readFileSync("./config.json"));

//Connect to mongodb
const mongo = require('./utility/mongo');

const mongoapp = new mongo();
mongoapp.connect()
.then((db) => { console.log(db); })
.catch((err) => { console.log(err); })

// Parsers for POST data
app.use(bodyParser.json());
//Parse cookie
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));

//ONLY IF CROSS ORIGIN REQUEST IS ALLOWED
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || config.server.port || '4000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`App running on 127.0.0.1:${port}`));