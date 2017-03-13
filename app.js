var models = require('./models');
var express = require('express')
var wikiRouter = require ('./Routes/wiki.js');
var app = express();
var nunjucks = require("nunjucks");
var bodyParser = require('body-parser')

nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render);
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use('/wiki', wikiRouter);

app.get('/', function(req, res, next){
  res.send("this is homepage");
});

models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    app.listen(3000, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);
