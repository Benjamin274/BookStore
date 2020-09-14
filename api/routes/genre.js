const  Genre = require( '../../models/Genre.js' )

const router = require('express').Router()


router.get('/',(req,res,next)=>{
    Genre.find({},(err,genres)=>{
        if(err)
        next(err)
        res.json(genres)
    })
})
router.post('/',(req,res,next)=>{
    // console.log('req.body :>> ', req.body);
    Genre.create(req.body,(err,genre)=>{
        if(err)
        next(err)
        res.json(genre)
    })
})


module.exports = router