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

function squareArrDistance(arr, input1, arrInputs){
	const comparisons = arrInputs.map(input => arrDistance(arr, input1, input))
	return Math.min.apply(null, comparisons)
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
	console.log(arguments)
	var score = []

	if(difficulty !== undefined){
		var difficultiesArr = ["Easy", "Medium", "Hard"]
		var difficultyDistance = arrDistance(difficultiesArr, difficulty, game.difficulty)
		var difficultyWeights = [1, .75]
		score.push(difficultyWeights[difficultyDistance] || 0)
	}

	if(time !== undefined){
		var timesArr = [5,15,30,60,61]
		var timeDistance = arrDistance(timesArr, time, game.time)
		var timeWeights = [1, .75, .1]
		score.push(timeWeights[timeDistance] || 0)
	}
	if (type !== undefined && type.length !== 0){
		score.push(typeScoreCalc(type, game.type) || 0)
	}
	if(numPlayers !== undefined){
		var numPlayersArr = [1,2,3,4,5,8]
		var numPlayersDistance  = squareArrDistance(numPlayersArr, numPlayers, game.numPlayers)
		var numPlayersWeights = [1, .5,.1]
		score.push(numPlayersWeights[numPlayersDistance] || 0)
	}

	console.log(score)

	score = Math.round((score.reduce((a,b)=> a+b)/score.length)*100)
	game = game.toObject()
	game.totalScore = score
	return game
}

	



module.exports = mongoose.model('Game', gameSchema);