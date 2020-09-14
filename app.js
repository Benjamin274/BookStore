const express = require('express')
const app = express()
const db = require('./db/connection.js')
app.use(require('morgan')('dev'))
app.use(require('cors')())
app.use(require('body-parser').urlencoded({extended: false}))

db.on('error', console.error.bind(console, 'there were  error connecting to your database:'));
db.once('open', function() {
  console.log('Successfully connected to database !   :>>>>>>>>>>>> ');
});

const port = process.env.PORT || 8000
const bookRouter = require('./api/routes/book.js');
const genreRouter = require('./api/routes/genre.js');

if(process.env.NODE_ENV == "production"){
    app.use(express.static('bookclient/dist'))
}

app.use('/book',bookRouter)
app.use('/genre',genreRouter)

app.use((req,res,next)=>{
next(new Error('Cant find any matched url to this request ):'))
})

app.use((error,req,res,next)=>{
    console.log('Error Ocured',error);
    res.status(error.status || 500)
    res.json({
        error:{
            message:error.message
        }
    })
})
app.listen(port,()=>{
    console.log('App Started at port :',port);
})