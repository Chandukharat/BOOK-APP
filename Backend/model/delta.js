const mongoose = require ('mongoose')
const validator = require ('validator');
const res = require('express/lib/response');


const deltaschema = new mongoose.Schema({
    image :{
        type : String ,
        

        required : true, 
    },
   price :{
        type : Number ,
        

        required : true, 
    },
    title : {
        type : String ,
        required : true, 
    },
   authour :{
        type : String , 
        required : true,
    }, 
    language :{
        type : String , 
        required : true,
    }
})

const booksdata = new mongoose.model('booksdata', deltaschema);
 
module.exports= booksdata ;