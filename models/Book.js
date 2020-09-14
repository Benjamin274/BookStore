//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    title: {type: String, required: true},  
    author: {type: String, required: true},
    file:  {type: String},
    // author: {type: Schema.Types.ObjectId, ref: 'Author', required: true},
    summary: {type: String, default:""},
    genre: {type: Schema.Types.ObjectId, ref: 'Genre'},
    uploaded: { type: Date, default: Date.now() },
    

});
BookSchema.virtual('url')
.get(()=>{
    return '/book/'+this._id
});


module.exports = mongoose.model('Book', BookSchema);