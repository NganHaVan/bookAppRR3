var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Get session
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// APIs
var mongoose= require('mongoose');
var Books=require('./models/books.js');

// MONGO LAB
mongoose.connect('mongodb://testUser:password@ds113936.mlab.com:13936/bookshop',{useMongoClient:true});

// LOCAL DB
// mongoose.connect('mongodb://localhost:27017/bookshop',{useMongoClient:true});

  // Middleware to capture session
    var db=mongoose.connection;
    db.on('error',console.error.bind(console,'#MongoDB - connection error: '));
    // ---->SET UP SESSION <---- 
      app.use(session({
        secret:'mySecretString',
        saveUninitialized: false,
        resave:false,
        cookie:{maxAge:1000*60*60*24*2},//2 days in milisecond
        store: new MongoStore({mongooseConnection:db, ttl:2*24*60*60})
        // ttl(Time to leave) is 2 days
      }))
        // SAVE SESSION CART TO API
        app.post('/cart',(req,res)=>{
          var cart=req.body;
          // console.log(req.body);
          req.session.cart=cart;
          req.session.save(function(err){
            if (err) {
              throw err;
            }
          res.json(req.session.cart);
          })
        })
        // GET SESSION CART API
        app.get('/cart',function(req,res){
          if (typeof req.session.cart !== 'undefined') {
            // console.log(req.session);
            // console.log(req.session.cart); 
            res.json(req.session.cart);
          }
        })
    // ---->END SESSION SETUP <----

  //---->POST BOOKS(Create book)<----  
  app.post('/books',function(req,res){
    var book=req.body;

    Books.create(book, function(err,books){
      if(err){
        throw err;
      }
      res.json(books);
    })
  })

  // ---->GET BOOKS<----
  app.get('/books',(req,res)=>{
    Books.find((err,books)=>{
      if (err) {
        throw err;
      }
      res.json(books);
    })
  })

  // ---->DELETE BOOK<----
  app.delete('/books/:_id',(req,res)=>{
    var query ={_id:req.params._id};
    Books.remove(query,(err,book)=>{
      if (err) {
        throw err;
      }
      res.json(book); 
    })
  })
  // ---->UPDATE BOOK <----
  app.put('/books/:_id',(req,res)=>{
    // Get the book object
    var book=req.body;
    var query=req.params._id;

    // If the field does not exist $set will create a new field
    var update={
      '$set':{
        title:book.title,
        description:book.description,
        price:book.price,
        images:book.images
      }
    };
    // True returns the updated document
    var option={new: true};

    Books.findOneAndUpdate(query,update,option,(err,books)=>{
      if (err) {
        throw err;
      }
      res.json(books);
    })
  })

  // GET BOOK IMAGES API
  app.get('/images',(req,res)=>{
    const imgFolder= __dirname+'/public/image';
    // REQUIRE FILE SYSTEM
    const fs=require('fs');
    // READ ALL FILE IN THE DIRECTORY
    fs.readdir(imgFolder,(err,files)=>{
      if (err) {
        return console.error(err);
      }
      const fileArr=[];
      // ITERATE ALL IMAGES IN THE DIRECTORY AND ADD TO ARRAY
      files.forEach((file)=>{
        fileArr.push({name:file});
      });
      // SEND THE JSON RESPONSE WITH THE ARRAY
      res.json(fileArr);
    })
  })

// END APIs

app.listen(3001,function(err){
  if (err) {
    return console.log(err);
  }
  console.log('API Server is running on port 3001');
})