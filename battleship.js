/**
 * @author Aaron Pollon
 */

var model = {
	boardSize : 7,
	numShips : 3,
	shipsSunk : 0,
	shipLength : 3,

	ships : [{
		locations : ["10", "20", "30"],
		hits : ["", "", ""]
	}, {
		locations : ["32", "33", "34"],
		hits : ["", "", ""]
	}, {
		locations : ["63", "64", "65"],
		hits : ["", "", ""]
	}],

	fire : function(guess) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);
			if (index >= 0) {
				//Hit!
				ship.hits[index] = "hit";
				if (this.isSunk(ship)) {
					this.shipsSunk++;
					console.log("Sunk!");
				}
				view.displayHit(guess);
				view.displayMessage("Hit!");
				return true;
			}
		}
		//Miss
		view.displayMiss(guess);
		view.displayMessage("Miss");
		return false;
	},

	isSunk : function(ship) {
		for (var i = 0; i < this.shipLength; i++) {
			if (ship.hits[i] !== "hit")
				return false;
		}
		view.displayMessage("You sunk my battleship!");
		return true;
	}
};

var view = {
	displayMessage : function(msg) {
		var msgArea = document.getElementById("message");
		msgArea.innerHTML = msg;
	},

	displayHit : function(id) {
		var cell = document.getElementById(id);
		cell.setAttribute("class", "hit");
	},
	displayMiss : function(id) {
		var cell = document.getElementById(id);
		cell.setAttribute("class", "miss");
	}
};

var controller = {
	numGuesses : 0,

	processGuess : function(guess) {
		var location = parseGuess(guess);
		console.log(location);
		if (location) {
			this.numGuesses++;
			var hasHit = model.fire(location);
			if (hasHit && model.shipsSunk === model.numShips) {
				//Gome Over
				view.displayMessage("Congratulations! You have sunk all " + model.numShips + " ships in " + this.numGuesses + " guesses!");
			}
		}
		var button = document.getElementById("fireButton");
	}
};

function parseGuess(guess) {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

	if (guess == null || guess.length != 2) {
		alert("Invalid input. Please enter a letter and a number.");
	} else {
		var firstChar = guess.charAt(0);
		var row = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);

		//Check if within number of rows
		if (isNaN(row) || isNaN(column)) {
			alert("Invalid input. Off the board");
		} else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
			alert("Invalid input. Off the board");
		} else {
			//Else valid input
			return row + column;
		}
	}
	//If hasn't returned, invalid input
	return null;
}

controller.processGuess("A6");

controller.processGuess("B0");
controller.processGuess("C0");
controller.processGuess("D0");

controller.processGuess("D2");
controller.processGuess("D3");
controller.processGuess("D4");

controller.processGuess("G3");
controller.processGuess("G4");
controller.processGuess("G5");

