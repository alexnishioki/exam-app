var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var path = require('path');
var pg = require('pg');
var knex = require('./db/knex');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'views'));

//main page

app.get('/',function(req,res,next) {
  res.render('main')
})

//  books
//....................................................................

app.get('/books',function(req,res,next) {
  knex('books').select('*').then(function(data) {
    console.log(data)
    res.render('index',{data:data})
  })
})


app.post('/books/genre', function(req, res, next) {
  var genre = req.body.genre
  knex('books').insert({genre:genre}).then(function() {
      res.redirect('/books')
  });
});

app.post('/books/description', function(req, res, next) {
  var description = req.body.description
  knex('books').insert({description:description}).then(function() {
      res.redirect('/books')
  });
});

app.get('/bookDisplay',function(req,res,next) {
  knex('books').select('*').then(function(data) {
    console.log(data)
    res.render('bookDisplay',{data:data})
  })
})

app.get('/booksDisplay',function(req,res,next) {
  knex('books').select('*').then(function(genre) {
    console.log(genre)
    res.render('bookDisplay',{genre:genre})
  })
})

app.get('/booksDisplay',function(req,res,next) {
  knex('books').select('*').then(function(description) {
    console.log(description)
    res.render('bookDisplay',{description:description})
  })
})


app.post('/books', function(req, res, next) {
  var books = req.body.books
  knex('books').insert({book:books}).then(function() {
      res.redirect('/books')
  });
});

app.post('/books/update',function(req,res,next) {
  var book = req.body.book
  var update = req.body.update

  knex('books').where({book:book}).update({book:update}).then(function() {
    res.redirect('/books')
  })
})

app.post('/books/delete',function(req,res,next) {
  var del = req.body.delete

  knex('books').where({book:del}).del().then(function() {
    res.redirect('/books')
  })
})

//  authors
//....................................................................


app.get('/authors',function(req,res,next) {
  knex('authors').select('*').then(function(data) {
    console.log(data)
    res.render('authors',{data:data})
  })
})

app.get('/authorDisplay',function(req,res,next) {
  knex('authors').select('*').then(function(data) {
    console.log(data)
    res.render('authorDisplay',{data:data})
  })
})

app.post('/authors', function(req, res, next) {
  var authors = req.body.authors
  knex('authors').insert({author:authors}).then(function() {
      res.redirect('/authors')
  });
});

app.post('/authors/update',function(req,res,next) {
  var author = req.body.author
  var update = req.body.update

  knex('authors').where({author:author}).update({author:update}).then(function() {
    res.redirect('/authors')
  })
})

app.post('/authors/delete',function(req,res,next) {
  var del = req.body.delete
  knex('authors').where({author:del}).del().then(function() {
    res.redirect('/authors')
  })
})

app.listen('8000',function() {
  console.log('word')
})
//module.exports = app;

