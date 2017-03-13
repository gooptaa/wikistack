var express = require('express');
var Router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

Router.post('/', function(req, res, next) {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`



  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });


  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save()
  .then(function(data, err){
    if (err) {res.send("Oops, there was an error")}
    else {res.json(data)}
  })
  // -> after save -> res.redirect('/');
});

Router.get('/', function(req, res, next){
  res.redirect("/");
});

// Router.post('/', function(req, res, next){
//   //res.send("any other random thing")
//   res.json(req.body)
//   console.log(req.body);
// });

// Router.get('/add', function(req, res, next){
//   res.send("add some random thing");
//   next();
// });

Router.get('/add', function(req, res) {
  res.render('../views/addpage');
});

module.exports = Router;


