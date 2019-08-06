const express = require('express');
const router = express.Router()

router.get('/',( req,res)=>
{
    res.render('index'); // pass the name of the file
})

module.exports = router   