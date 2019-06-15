//Izbor vrste igre
$(function(){

const target = $("#gameMode");

	target.change(function changeStyle() {
		let gameMode = target.val();
		if (gameMode === "frozen") {
			$(".playModul-h1").text("frozen");
	  		$(".playModul-h1").css("font-family", "frozen");
	  		$(".playModul-ImgTop").attr("src", "images/frozen/modulTop.png");
		}
		else if (gameMode === "disney") {
			$(".playModul-h1").text("Disney");
	  		$(".playModul-h1").css("font-family", "disney");
	  		$(".playModul-ImgTop").attr("src", "images/disney/modulTop.png");
		}
	});

});