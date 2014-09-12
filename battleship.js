/**
 * @author Aaron Pollon
 */

var model = {
	boardSize: 7,
	numShips: 3,
	shipsSunk: 0,
	shipLength: 3,
	
	ships: [{ locations: ["10", "20", "30"], hits: ["", "", ""] },
			{ locations: ["32", "33", "34"], hits: ["", "", ""] }, 
			{ locations: ["63", "64", "65"], hits: ["", "", ""] }],

	fire: function(guess) {
		for(var i=0; i < this.numShips; i++) {	
			var ship = this.ships[i];		
			var index = ship.locations.indexOf(guess);
			if(index >= 0) {
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
			else {
				//Miss
				view.displayMiss(guess);
				view.displayMessage("Miss");
				return false;
			}			
		}
	},
	
	isSunk: function(ship){
		for(var i=0; i<this.shipLength; i++) {
			if (ship.hits[i] !== "hit") return false;
		}
		view.displayMessage("You sunk my battleship!");
		return true;
	}
	
};

var view = {
	displayMessage:  function(msg){
		var msgArea = document.getElementById("message");
		msgArea.innerHTML = msg;
	},
	
	displayHit: function(id) {
		var cell = document.getElementById(id);
		cell.setAttribute("class", "hit");
	},
	displayMiss: function(id) {
		var cell = document.getElementById(id);
		cell.setAttribute("class", "miss");
	}
	
	
};

var controller = {
	shipsSunk: 0, 
	
};

model.fire("00");
// model.fire("10");
