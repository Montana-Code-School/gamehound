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
	




	// var thirdMatches = [correlationArray[perfectMatchIndex+2], correlationArray[perfectMatchIndex-2], .25 ]
	this.find(games, function(err, games) {
		if (err) {
			throw err
		} else {
			
		}
	}) 
}

function arrDistance(arr, input1, input2){
	return Math.abs(arr.indexOf(input1) - arr.indexOf(input2))
}


function typeScoreCalc(userType, gameTypeArr) {
	var score = 0
	var diceCards = ["Dice", "Card"]
	var partyGames = ["Drinking", "Party/Group", "Icebreaker", "Movement/Improv"]
	var thinkingGames = ["Thought Provoking/Discussion", "Roadtrip"]
	for (var i=0; i<userType.length; i++) {
		if (gameTypeArr.indexOf(userType[i]) !== -1) {
			score++
		} else if (userType[i]) {}
		// Within same group = .75
		// Dice vs Party = .5
		// Thinking vs Everything = 0
		}


	
	return score
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
}

	



module.exports = mongoose.model('Game', gameSchema);