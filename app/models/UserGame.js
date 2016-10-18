//this is the individual game that the user has selected to play either in progress or finished

var mongoose = require('mongoose');
var Game = require('./Game.js');
var User = require('./User.js');

var playerSchema = mongoose.Schema({
	playerName : String,
	score : Number
})

var userGameSchema = mongoose.Schema({

	gameName: String,
	username: String,
	players: [playerSchema],
	dateCompleted: Date,
	rating: Number //How do we use this to calculate Game rating average?

})

module.exports = mongoose.model('UserGame', userGameSchema);
module.exports = mongoose.model('UserGame', playerSchema);

