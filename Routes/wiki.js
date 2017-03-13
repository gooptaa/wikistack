var express = require('express');
var Router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

Router.post('/', function(req, res, next) {
  console.log(req.body)
  User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
  .then(function (values) {

    var user = values[0];

    var page = Page.build({
      title: req.body.title,
      content: req.body.content
    });

    return page.save().then(function (page) {
      return page.setAuthor(user);
    })
  .then(function (page) {
    res.redirect(page.route);
  })
  .catch(next);
  // var page = Page.build({
  //   authorId: req.body.name,
  //   title: req.body.title,
  //   content: req.body.content
  // });

  // var isUser = function(name){
  //   if (User.findOne()){
  //     return true
  //   }
  //   return false
  // }

  // if (!isUser(req.body.name)){
  //   var user = User.build({
  //     name: req.body.name,
  //     email: req.body.email
  //   })
  })

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  // page.save()
  // .then(function(data, err){
  //   if (err) {res.send("Oops, there was an error")}
  //   else {res.redirect(data.urlTitle)}
  // })
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

Router.get('/:urlTitle', function(req, res, next) {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(findpage) {
    res.render('wikipage.html', {findpage: findpage});
  })
  .catch(next);
});



module.exports = Router;


