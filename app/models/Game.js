var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({

	gameName: String,
	numPlayers: Number, //how to make a range? 
	type: [],
	time: Number,
	description: String,
	itemsNeeded: [],
	tutorial: [],
	rating: Number,
	difficulty: String
})

//write filter methods here to pick user game

gameSchema.statics.gameRank = function(difficulty, callback) {

}


module.exports = mongoose.model('Game', gameSchema);