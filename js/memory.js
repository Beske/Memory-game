// Kontrole za igru
$(function(){
const play = $("#playBtn");
const playModul = $(".playModul");
const gameModul = $(".gameModul");

	play.click(function startMemory(event) {
		// Pokretanje igre
		event.preventDefault();
		const mode = $("#gameMode").val();
		const difficult = $("#difficult").text();

		playModul.fadeOut();
		gameLayout(mode, difficult);
		gameModul.fadeIn();
	});
});

const memoryStats = {
	// Setup igre
	clicks: 0,
	time: "",
	clock: setInterval(gameTime, 100),
	mode: "",
	difficult: "",
	stars: 3,
	cards: 0
};

const timeWatch = {
	// Vreme igre
	minHigh: 0,
	minLow: 0,
	secHigh: 0,
	secLow: 0,
	msec: 0
};

// Brisanje svega i priprema za novu igru
function cleanLayout() {
	$(".gameModul-Main").children().remove();
	$("#nrClicks").text("0");
	memoryStats.clicks = 0;
	
	memoryStats.time = "";
	timeWatch.minHigh = 0;
	timeWatch.minLow = 0;
	timeWatch.secHigh = 0;
	timeWatch.secLow = 0;
	timeWatch.msec = 0;

	$("#star2").addClass("checked");
	$("#star3").addClass("checked");
	memoryStats.stars = 3;
}

function gameLayout(mode, difficult) {
	memoryStats.mode = mode;
	memoryStats.difficult = difficult;

	cleanLayout();

	// Nizovi sa karticama
	const frozenCards = [
	"card_1", "card_2", "card_3", "card_4", "card_5", "card_6", "card_7", "card_8"
	];
	const disneyCards = [
	"card_1", "card_2", "card_3", "card_4", "card_5", "card_6", "card_7", "card_8",
	"card_9", "card_10", "card_11"
	];

	// Odabir kartica
	if (memoryStats.mode === "frozen") {
		pickOutCards = frozenCards;
	}
	else if (memoryStats.mode === "disney") {
		pickOutCards = disneyCards;
	}

	// Odredjivanje broja kartica na osnovu odabrane tezine igre
	if (memoryStats.difficult === "Lako") {
		memoryStats.cards = 3;
	}
	else if (memoryStats.difficult === "Srednje") {
		memoryStats.cards = 6;
	}
	else if (memoryStats.difficult === "Tesko") {
		memoryStats.cards = 8;
	}

	// Ubacivanje izabranog broja kartica u niz za igru
	let gameCards = [];

	for (let i = 0; i < memoryStats.cards; i++) {
		let randId = pickOutCards[Math.floor(Math.random() * pickOutCards.length)];
		gameCards.push(randId);
		let checkIndex = pickOutCards.indexOf(randId);
		pickOutCards.splice(checkIndex, 1);
	}
	// Dupliranje kartica zbog uparivanja
	gameCards = gameCards.concat(gameCards);
	console.log(gameCards);

	const cardHolder = $(document.createDocumentFragment());
		for (let k = 1; k <= (memoryStats.cards * 2); k++) {
			let rand = gameCards[Math.floor(Math.random() * gameCards.length)];
			let cardImg = "<img src=\"images/" + memoryStats.mode + "/" + rand + ".png\" alt=\"" + rand + "\">";
			let frontImg = "<img src=\"images/" + memoryStats.mode + "/cardBg.png\" alt=\"Card BG picture\">";
			let card = "<div class=\"card\"><figure class=\"front\">" + frontImg + "</figure><figure class=\"back\">" + cardImg + "</figure></div>";
			cardHolder.append(card);
			let index = gameCards.indexOf(rand);
			gameCards.splice(index, 1);
		}

	$(".gameModul-Main").append(cardHolder);

	$(".card").click(function() {
		let event = $(this);
		cardController(event);
	});

	// Ponovno pokretanje igre
	$("#rePlayBtn").click(function(event){
		event.preventDefault();
		gameLayout(memoryStats.mode, memoryStats.difficult);
	});

	// Povratak na pocetnu stranu
	$("#goBackBtn").click(function(event){
		event.preventDefault();
		$(".gameModul").fadeOut();
		$(".playModul").fadeIn();
	});
};

// Funkcija za okretanje kartica
function cardController(clickedCard) {
	if (clickedCard.hasClass("flipped")) {
		console.log("Card already finnished or clicked");
	}
	else {
		let cardsToCheck = $(".marked");
		starsAndClick();

		if (cardsToCheck.length >= 2) {
			console.log("Already 2 cards to check");
		}
		else if (cardsToCheck.length === 1) {
			console.log("2 cards ready");
			clickedCard.addClass("flipped");
			clickedCard.addClass("marked");

			setTimeout(function(){
				cardsToCheck = $(".marked");
				const card1 = cardsToCheck.slice(0, 1);
				const card2 = cardsToCheck.slice(1, 2);

				if (card1.find(".back").find("img").attr("alt") === card2.find(".back").find("img").attr("alt")) {
					cardsToCheck.addClass("cardCorrect");
					cardsToCheck.removeClass("marked");
					console.log("Card match");
				}
				else {
					cardsToCheck.addClass("cardWrong");
					setTimeout(function(){
						cardsToCheck.removeClass("cardWrong");
						cardsToCheck.removeClass("flipped");
						cardsToCheck.removeClass("marked");
						console.log("Card wrong");
					}, 1500);
				}
				isAllDone();
			}, 2000);
		}
		else {
			console.log("1 card ready");
			clickedCard.addClass("flipped");
			clickedCard.addClass("marked");
		}
	}
};

// Provera da li je igra zavrsena
function isAllDone() {
	const correctCards = $(".cardCorrect");
	if (correctCards.length === (memoryStats.cards * 2)) {
		console.log("Game finnished");
		showScore();
	}
}

// Update broja poteza i broja zvezdica
function starsAndClick() {
	memoryStats.clicks++;
	$("#nrClicks").text(memoryStats.clicks);
	// Laki nivo
	if (memoryStats.difficult === "Lako") {
		if (memoryStats.clicks === 7) {
			memoryStats.stars--;
			$("#star3").removeClass("checked");
		}
		else if (memoryStats.clicks === 11) {
			memoryStats.stars--;
			$("#star2").removeClass("checked");
		}
	}
	// Srednji nivo
	else if (memoryStats.difficult === "Srednje") {
		if (memoryStats.clicks === 15) {
			memoryStats.stars--;
			$("#star3").removeClass("checked");
		}
		else if (memoryStats.clicks === 21) {
			memoryStats.stars--;
			$("#star2").removeClass("checked");
		}
	}
	// Teski nivo
	else if (memoryStats.difficult === "Tesko") {
		if (memoryStats.clicks === 23) {
			memoryStats.stars--;
			$("#star3").removeClass("checked");
		}
		else if (memoryStats.clicks === 27) {
			memoryStats.stars--;
			$("#star2").removeClass("checked");
		}
	}
}

// Brojac vremena igre
	function gameTime() {
		timeWatch.msec++;

		if (timeWatch.msec === 10) {
			timeWatch.secLow++;
			timeWatch.msec = 0;
			};
		if (timeWatch.secLow === 10) {
			timeWatch.secHigh++;
			timeWatch.secLow = 0;
		};
		if (timeWatch.secHigh === 6) {
			timeWatch.minLow++;
			timeWatch.secHigh = 0;
			timeWatch.secLow = 0;
		};
		if (timeWatch.minLow === 10) {
			timeWatch.minHigh++;
			timeWatch.minLow = 0;
		};

		memoryStats.time = "" + timeWatch.minHigh + timeWatch.minLow + ":" + timeWatch.secHigh + timeWatch.secLow + ":" + timeWatch.msec;
		$("#countTime").text(memoryStats.time);
	}

// Prikaz rezultata
function showScore() {
	$(".gameModul").fadeOut("slow");
	$(".finnishModul").fadeIn();

	// Prikaz zvezdica na osnovu rezultata
	$("#finnishStars").children().remove();
	const stars = $(document.createDocumentFragment());
	for (let i = 1; i <= 3; i++) {
		if (i <= memoryStats.stars) {
			star = "<span class=\"fa fa-star checked\"></span>";
			stars.append(star);
		}
		else {
			star = "<span class=\"fa fa-star\"></span>";
			stars.append(star);
		}
	}

	$("#finnishStars").append(stars);
	$("#finnishTime").text(memoryStats.time);
	$("#finnishClicks").text(memoryStats.clicks);

	// Ponovo pokretanje igre
	$("#playAgain").click(function(event){
		event.preventDefault();
		$(".finnishModul").fadeOut();
		gameLayout(memoryStats.mode, memoryStats.difficult);
		$(".gameModul").fadeIn();
	});

	// Povratak na glavnu stranicu
	$("#closeGame").click(function(event){
		event.preventDefault();
		$(".finnishModul").fadeOut();
		$(".playModul").fadeIn();
	});
};