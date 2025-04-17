const mongoose = require("mongoose");

function connectToDb(url){
    return mongoose.connect(url);
}

module.exports = connectToDb;