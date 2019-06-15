//Biranje tezine igre
$(function(){

const goDown = $("#goDown");
const goUp = $("#goUp");
const target = $("#difficult");

let selected = "srednje";

	goDown.click(function moveDown() {
		if (selected === "tesko") {
			target.text("Srednje");
			selected = "srednje";
		}
		else if (selected === "srednje") {
			target.text("Lako");
			selected = "lako";
		}
	});

	goUp.click(function moveUp() {
		if (selected === "lako") {
			target.text("Srednje");
			selected = "srednje";
		}
		else if (selected === "srednje") {
			target.text("Tesko");
			selected = "tesko";
		}
	});

});