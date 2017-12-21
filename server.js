"use strict"
var express=require('express');
var path=require('path');

var app=express();

//MIDDLEWARE: Defining static file
app.use(express.static('public'));

// Set port
app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})
