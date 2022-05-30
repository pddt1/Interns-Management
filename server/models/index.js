const mongoose = require('mongoose');
const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.interns = require("./interns.model");
module.exports = db;