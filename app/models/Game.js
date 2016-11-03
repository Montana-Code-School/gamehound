var _ = require('lodash')
var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({

	gameName: String,
	numPlayers: [], 
	type: [],
	time: Number,
	description: String,
	itemsNeeded: [],
	tutorial: [],
	rating: Number,
	difficulty: String
})

//write filter methods here to pick user game
													
gameSchema.statics.createFilterScore = function(userInput, callback) {
	this.find(function(err, games) {

		if (err) {
			callback(err)
		} else {
			var sortedGames = games.map(function(game) {
				return scoreGame(userInput.difficulty, userInput.numPlayers, userInput.time, userInput.type, game)
			}).sort(function(game1, game2) {
				return game2.totalScore - game1.totalScore
			})
			callback(null, sortedGames)
		}
	})
}

function arrDistance(arr, input1, input2){
	if(input1 !== undefined && input2 !== undefined){
		return Math.abs(arr.indexOf(input1) - arr.indexOf(input2))
	}
}

var gameTypeScores = 
	{Dice:
		{Dice:1,
		Card:.75,
		Drinking:.5,
		'Party/Group':.5,
		Icebreaker:.5,
		'Movement/Improv':0,
		'Thought Provoking/Discussion':0,
		Roadtrip:0},

	Card:
		{Dice:.75,
		Card:1,
		Drinking:.5,
		'Party/Group':.5,
		Icebreaker:.5,
		'Movement/Improv':0,
		'Thought Provoking/Discussion':0,
		Roadtrip:0},

	Drinking:
		{Dice:.5,
		Card:.5,
		Drinking:1,
		'Party/Group':.75,
		Icebreaker:.5,
		'Movement/Improv':.75,
		'Thought Provoking/Discussion':0,
		Roadtrip:0},

	'Party/Group':
		{Dice:.5,
		Card:.5,
		Drinking:.75,
		'Party/Group':1,
		Icebreaker:.75,
		'Movement/Improv':.75,
		'Thought Provoking/Discussion':.5,
		Roadtrip:0},

	Icebreaker:
		{Dice:0,
		Card:0,
		Drinking:.75,
		'Party/Group':.75,
		Icebreaker:1,
		'Movement/Improv':.75,
		'Thought Provoking/Discussion':.5,
		Roadtrip:0},

	'Movement/Improv':
		{Dice:0,
		Card:0,
		Drinking:.75,
		'Party/Group':.75,
		Icebreaker:.75,
		'Movement/Improv':1,
		'Thought Provoking/Discussion':.5,
		Roadtrip:0},

	'Thought Provoking/Discussion':
		{Dice:0,
		Card:0,
		Drinking:0,
		'Party/Group':.5,
		Icebreaker:.5,
		'Movement/Improv':.5,
		'Thought Provoking/Discussion':1,
		Roadtrip:.75},

	Roadtrip:
		{Dice:0,
		Card:0,
		Drinking:0,
		'Party/Group':0,
		Icebreaker:0,
		'Movement/Improv':0,
		'Thought Provoking/Discussion':.75,
		Roadtrip:1}
	}

function typeScoreCalc(userType, gameTypeArr) { //always call with bracket notation because of spec chars
	var score = userType.map(function(userChoice){
		return gameTypeArr.map(function(gameChoice){
			return gameTypeScores[userChoice][gameChoice]
		})
		.filter(result => result !== undefined)
	})	
	return Math.max(..._.flatten(score)) || 0
}


function scoreGame(difficulty, numPlayers, time, type, game) {
	var typeScore = typeScoreCalc(type, game.type)
	var score = 0 + typeScore
	
	var difficultiesArr = ["Easy", "Medium", "Hard"]
	var numPlayersArr = [1,2,3,4,5,8]
	var timesArr = [5,15,30,60,61]
	var difficultyScore = arrDistance(difficultiesArr, difficulty, game.difficulty)
	var numPlayersScore  = arrDistance(numPlayersArr, numPlayers, game.numPlayers)
	var timeScore = arrDistance(timesArr, time, game.time)

	/////////
	// difficulty, numplayer and time score is broken when only selecting one option 
	///////

	if (difficultyScore === 0) {
		score++
	} else if (difficultyScore === 1) {
		score += .75
	}

	if (numPlayersScore === 0) {
		score++
	} else if (numPlayersScore === 1) {
		score += .5
	} else if (numPlayersScore === 2) {
		score += .1
	}
	
	if (timeScore === 0) {
		score++
	} else if (timeScore === 1) {
		score += .75
	} else if (timeScore === 2) {
		score += .1
	}
	
	var inputCount = 0
	for(var i = 0; i <= 3; i++){
		var newI = i.toString()
		if(arguments[newI]){
			inputCount++
		}
	}

	score = Math.round((score/inputCount)*100)
	game = game.toObject()
	game.totalScore = score
	console.log("Do we have a score? ", score)
	return game
}

	



module.exports = mongoose.model('Game', gameSchema);