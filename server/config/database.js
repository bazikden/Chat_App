const mongoose = require("mongoose");
const config = require("./key");
 mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })


  module.exports = mongoose.connection
