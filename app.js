var models = require('./models');

// ... other stuff

models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    server.listen(3000, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);
