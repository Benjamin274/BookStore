//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var GenreSchema = new Schema({
    name: {type: String, required: true}
});
GenreSchema.virtual('url')
.get(()=>{
    return '/genre/'+this._id
});


module.exports = mongoose.model('Genre', GenreSchema);