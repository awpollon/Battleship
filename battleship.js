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
			var index = this.ships[i].locations.indexOf(guess);
			if(index >= 0) {
				//Hit!
				this.ships[i].hits[index] = "hit";
				return true;
			}
			else {
				//Miss
				return false;
			}			
		}
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
	
};


console.log(model.fire("10"));
