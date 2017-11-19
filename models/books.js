

var mongoose=require('mongoose');
var bookSchema=mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    images:String
});
var Books=mongoose.model('Books',bookSchema);
module.exports=Books;