var Game = require('./models/Game');

module.exports = function(app, passport) {


    // this route adds a new game to the database through the Create A Game feature
    app.post('/api/game', function (req, res) {
        new Game({
        gameName: req.body.gameName,
        numPlayers: req.body.numPlayers.list, //needs to be array
        type: req.body.type.list, //needs to be array
        time: req.body.time,
        description: req.body.description,
        itemsNeeded: req.body.itemsNeeded.list, //needs to be array
        tutorial: req.body.tutorial.list, //needs to be array
        rating: req.body.rating, 
        difficulty: req.body.difficulty
        })
        .save(function(err, data) {
            if (err) {
            console.error("Post game to database error: ", err)
            } else {
            res.json(data)
            }
        })
    })

    // this route is used to post the user input to the recommend api
    // and use the filter function to return a sorted list of games based on match % 
    app.post('/api/game/recommend', function(req, res){
        Game.createFilterScore({difficulty:req.body.difficulty,
            type:req.body.type.list,
            numPlayers:req.body.numPlayers,
            time:req.body.time}
            ,function(err, sortedGames){
                res.json(sortedGames)
        })
    })
    

    // this route uses passport to add a new user to the DB
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/api/user', // redirect to the secure profile section
        failureRedirect : '/api/user', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // this route uses passport to make sure username and password exist in DB
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/api/user', // redirect to the secure profile section
        failureRedirect : '/api/user', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // this route uses passport to log out user
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/api/user');
    });

    // this route is to set state of loggedIn and would be able to help set flash errors
    app.get('/api/user', function(req, res){
        if(req.user){
            res.json({ loggedIn: true, user: req.user, flash: req.flash()})
        } else { // We have logged out...
            res.json({loggedIn: false, flash: req.flash()})
        }
    })
}