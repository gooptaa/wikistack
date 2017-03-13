var models = require('./models');
var express = require('express')
var wikiRouter = require ('./Routes/wiki.js');
var app = express();
var nunjucks = require("nunjucks");
var bodyParser = require('body-parser');
var models = require('./models');
var Page = models.Page;
var User = models.User;
var Promise = require('bluebird')

nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render);
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/wiki', wikiRouter);


app.get('/', function(req, res, next){
  Page.findAll().then(function(pages){
      res.render('index', {pages: pages})
  })
  //console.log(Page.findAll().then(function));
});

app.get('/users', function(req, res){
    User.findAll().then(function(users){
        res.render('users', {users: users})
    })
})

app.get('/users/:id', function(req, res){
    var userId = User.findOne({
        where: {
            id: req.params.id
        }
    })
    var pages = Page.findAll({
        where : {
            authorId: req.params.id
        }
    })
    Promise.all([userId, pages])
    .then(function(data){
        console.log("this is the data:", data[0])
        res.render('userpage', {data: data})
    })
})

app.get('/:urlTitle', function(req, res){
    res.redirect('/wiki/' + req.params.urlTitle)
})

models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);
