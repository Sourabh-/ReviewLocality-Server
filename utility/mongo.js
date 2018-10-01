const fs = require('fs');
const config = JSON.parse(fs.readFileSync("./config.json"));
const MongoClient = require('mongodb').MongoClient;

module.exports = class mongo {
    constructor() {
        this.db = null;
    }

    connect() {
    	return MongoClient.connect(config.mongo.url, { useNewUrlParser: true });
    }
}