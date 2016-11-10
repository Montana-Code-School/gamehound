// We didn't use, but would use to assign ratings and save games, or add user's own, etc.

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
	rating: Number

})

module.exports = mongoose.model('UserGame', userGameSchema);
module.exports = mongoose.model('UserGame', playerSchema);

