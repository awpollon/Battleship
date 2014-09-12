/**
 * @author Aaron Pollon
 */

var model = {
	boardSize : 7,
	numShips : 3,
	shipsSunk : 0,
	shipLength : 3,

	ships : [{
		locations : ["0", "0", "0"],
		hits : ["", "", ""]
	}, {
		locations : ["0", "0", "0"],
		hits : ["", "", ""]
	}, {
		locations : ["0", "0", "0"],
		hits : ["", "", ""]
	}],

	generateShipLocations : function() {
		var locations;
		//Loop through each ship
		for (var i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations = locations;
		}
	},
	
	generateShip: function() {
			
			//Choose random direction
			var isHorizontal = Math.floor(Math.random() * 2);
			var newShipLocations = [];

			//Choose random starting point within dimensions (based on direction)
			var row = Math.floor(Math.random() * (this.boardSize));
			var column = Math.floor(Math.random() * (this.boardSize - (this.shipLength - 1)));
			console.log("Column: " + column);

			//If ship is vertical, swap values
			if (!isHorizontal) {
				var temp = row;
				row = column;
				column = temp;
			}

			//Increment in chosen direction by one, shipLength-1 times
			for (var j = 0; j < this.shipLength; j++) {

				var location = "" + row + column;
				console.log(location);
				newShipLocations.push(location);

				if (isHorizontal)
					column++;
				else
					row++;
			}
			return newShipLocations;
	},
	
	//Method to check if new ship will conflict with existing ship
	collision : function(locations) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = model.ships[i];
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					console.log("Collision!");
					return true;
				}
			}
		}
		return false;
	},

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
		console.log("Location: " + location);
		if (location) {
			this.numGuesses++;
			var hasHit = model.fire(location);
			if (hasHit && model.shipsSunk === model.numShips) {
				//Gome Over
				view.displayMessage("Congratulations! You have sunk all " + model.numShips + " ships in " + this.numGuesses + " guesses!");
			}
		}
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

function init() {
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;
	var textArea = document.getElementById("input");
	textArea.onkeypress = handleKeyPress;

	model.generateShipLocations();
}

function handleKeyPress(e) {
	var fireButton = document.getElementById("fireButton");
	if (e.keycode === 13) {
		fireButton.click();
		return false;
	}
}

function handleFireButton() {
	var textArea = document.getElementById("input");
	var input = textArea.value;
	if (input) {
		console.log("Input:" + input);
		controller.processGuess(input);
	}
	textArea.value = "";

	return false;
}

window.onload = init;

// controller.processGuess("A6");
//
// controller.processGuess("B0");
// controller.processGuess("C0");
// controller.processGuess("D0");
//
// controller.processGuess("D2");
// controller.processGuess("D3");
// controller.processGuess("D4");
//
// controller.processGuess("G3");
// controller.processGuess("G4");
// controller.processGuess("G5");

