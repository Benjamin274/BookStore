const Book = require('../models/Book.js')
const fs  = require('fs')

exports.getAllBooks = (req,res,next)=>{
    Book.find({},(err,books)=>{
        if (err)
        res.status(200)
        res.json(books)
    })  
}
exports.getBookByGenre = (req,res,next)=>{
    const genreId = req.params.id
    console.log('genreId :>> ', genreId);
    Book.find({genre:genreId},(err,books)=>{
        if (err)
        res.status(200)
        res.json(books)
    })  
}

exports.postBook = (req,res,next)=>{
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    } 
    Book.create({...req.body,file:file.filename},(err,book)=>{
    if(err)
    next(err)
    res.json(book)
    })

}