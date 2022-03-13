$(document).ready(function() {
  //fallback for safari as it doesn't support vh
  if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
    $(".game").height( $(window).height() * 0.9 );
  }
	
	var cards = ['piggy-bank', 'shoe', 'plane', 'suitcase', 'robot', 'ring', 'palm-tree', 'mp3'];
	var pairs = cards.concat(cards);//create pairs of cards
	var chosenCards = [];
	var cardsToFlip = [];
	
	var gameStarted = false;
	var running = false;
	var outOfTime = false;
	var countdownStarted = false;
	var win = false;
	var pairCount = 0;
	var time = 60;
	
	shuffleArray(pairs);//shuffle cards
	
	$('.back').each(function(i, element) {
	    $(this).attr('id', pairs[i]);//sets id in DOM for cards, access styles via css
	});
	
	$('.flip-container').click(function(){
		
		if (!outOfTime) {
		
			if (!gameStarted && !running){//before the game starts, show all cards to the user and flip back
				
				running = true;
				
				$('.flip-container').each(function() {
				    $(this).toggleClass('flip');
				});
				
				setTimeout(function() {
					
					$('.flip-container').each(function() {
				    	$(this).toggleClass('flip');
					});
					
					gameStarted = true;
					running = false;
					
				}, 3000);
			}
	
			else if ($(this).find('.back').attr('id') == chosenCards[0] && chosenCards[1] == null && $(this).hasClass('flip') && !running) {
				
				running = true;
				
				chosenCards[0] = null;//if one card has been chosen and then clicked again, flip back over
				$(this).toggleClass('flip');
				
				running = false;
				
			}
			
			else if ($(this).hasClass('flip')) {
						
				return;//if the card clicked is already flipped, return
				
			}
		
			else if (chosenCards[0] == null && chosenCards[1] == null && !$(this).hasClass('flip') && !running) {
				
				if (!countdownStarted) {
					countdown();
				}
				
				running = true;
				
				chosenCards[0] = $(this).find('.back').attr('id');//if no cards have been chosen, store the chosen card's in chosenCards[0]
				$(this).toggleClass('flip');
				
				running = false;
				
			}
		
			
			else if (chosenCards[0] != null && chosenCards[1] == null && !$(this).hasClass('flip') && !running) {
				
				running = true;
				
				chosenCards[1] = $(this).find('.back').attr('id');//if no second card has been flipped, store the chosen card's brand in chosenCards[1] and flip it
				$(this).toggleClass('flip');
		
				if (chosenCards[0] == chosenCards[1]) {
					
					chosenCards[0] = null;
					chosenCards[1] = null;
					
					pairCount++;
					
					if (pairCount == cards.length) {
						win = true;
						swal({
  title: '恭喜你完成挑戰！',
  text: "快點擊下方連結送你一張電影票！",
  type: "success",
  showConfirmButton: true,
  confirmButtonText: "立即索取",
}).then(function(){window.location.href= "https://h5.smartcinema.com.tw/ticket-intl-tw/index.html?giveCode=DRCDLNHX&_lang=zh_TW"});
					}
					
					running = false;
					
				}
		
				else {//if the brands did not match - empty the chosenCards & flip the cards back over 
					
					cardsToFlip[0] = chosenCards[0];
					cardsToFlip[1] = chosenCards[1];
					
					chosenCards[0] = null;
					chosenCards[1] = null;
					
					setTimeout(function(){//flip back the chosen cards that did not match
		
						$('*[id*=' + cardsToFlip[0] + ']').each(function() {
						    $(this).closest('.flip').toggleClass('flip');
						});
						$('*[id*=' + cardsToFlip[1] + ']').each(function() {
						    $(this).closest('.flip').toggleClass('flip');
						});
						
						running = false;
						
					}, 800);
				}
				
			}
				
		} else {
			swal({
  title: '恭喜你完成挑戰！',
  text: "快點擊下方按鈕送你《雙面遊戲》電影票！",
  type: "success",
  showConfirmButton: true,
  confirmButtonText: "立即索取",
}).then(function(){window.location.href= "https://h5.smartcinema.com.tw/ticket-intl-tw/index.html?giveCode=DRCDLNHX&_lang=zh_TW"});
					
		};
		
	});//Flip Container Click End
	
	function shuffleArray(array) {
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	    return array;
	}
	
	function countdown () {
		
		countdownStarted = true;
	
		var timeStart = +new Date;
		var timer = setInterval( function() {
			
			var timeNow = +new Date;
		    var difference = ( timeNow - timeStart ) / 1000; //calculates time difference if game isn't in focus
			
			if (time > 0 && !win) {// if there is still time left and game isn't won, deduct time
				
	 			time = 60;
				time = Math.floor( time - difference );
				$('.timer').text( time );
				
			} else if (win) {//stop timer when game is won
				
				clearInterval(timer);
				
			} else {//stop timer when time is run out
				
				outOfTime = true;
				swal({
  title: '歐喔！你沒能在時限內完成',
  text: "點擊按鈕重新挑戰",
  type: "info",
  showConfirmButton: true,
  confirmButtonText: "再試一次",
})
.then(
  function(){window.location.href= "https://smartcinematw.neocities.org/pairs_game/"}
  );
				
				clearInterval(timer);
				
			} 
			
		}, 250 );
		
	};

});//Document Ready End


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}