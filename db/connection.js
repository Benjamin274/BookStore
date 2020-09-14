const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://BenZack:ben@zack@benjacluster1.o0zuh.mongodb.net/test', {useNewUrlParser: true});
module.exports =  mongoose.connection;
