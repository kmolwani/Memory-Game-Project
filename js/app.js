/*
 * Create a list that holds all of your cards
 */
 var cardList = ['fa-diamond', 'fa-paper-plane-o',
                 'fa-anchor', 'fa-bolt',
                 'fa-cube', 'fa-anchor',
                 'fa-leaf', 'fa-bicycle',
                 'fa-diamond', 'fa-bomb',
                 'fa-leaf', 'fa-bomb',
                 'fa-bolt', 'fa-bicycle',
                 'fa-paper-plane-o', 'fa-cube']

 /*
  * Display the cards on the page
  */

function generateCard(cardList) {
  return `<li class='card'><i class='fa ${cardList}'></i></li>`;
}

function cardsStack() {
  var unorderedListElement = document.querySelector('.deck');

  var listCode = cardList.map(function(card) {
    return generateCard(card);
  });

  unorderedListElement.innerHTML = listCode.join('');

}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card.
 */

function matchingGame() {

  var cards = document.querySelectorAll('.card');
  var cardOpen = [];
  var matchingCards = 0;
  var moves = 0;
  // console.log(cards);

  cards.forEach( function(card) {
    card.addEventListener('click', function(event) {
        cardOpen.push(card.firstElementChild.className);
        moves += 1;
        var movesUpdate = document.querySelector('.moves');
        movesUpdate.textContent = moves;
        // console.log(moves);

        if (moves == 20) {
          var star = document.querySelector('.fa-star');
          star.classList.remove('fa-star');
        } else if (moves == 50) {
          var star = document.querySelector('.fa-star');
          star.classList.remove('fa-star');
        }

          if (cardOpen.length <= 2) {
            card.classList.add('open','show');

              if (cardOpen.length == 2 && cardOpen[0] === cardOpen[1]) { //checking if the cards match

                var match = document.querySelectorAll('.open' , '.show') //finding all cards with class open & show

                match.forEach ( function(matches) {
                  setTimeout(function() {
                    matches.classList.remove('open', 'show'); //removing class open & show from the open cards
                    matches.classList.add('match'); //adding class match to the open cards
                  }, 0);
                });

                cardOpen = []; // setting cards open counter back to zero

                // checking for total matched cards
                matchingCards += match.length;

                if (matchingCards == 16 ){
                  alert ('Congratulations!')
                }

                } else if (cardOpen.length == 2 && cardOpen[0] != cardOpen[1]) { //checking if the cards do not match

                      var flip = document.querySelectorAll('.open', '.show') //finding all cards with class open & show

                      flip.forEach ( function(flips) {
                        setTimeout(function() {
                          flips.classList.remove('open','show') //removing class open & show from open cards
                        }, 300);
                      });

                      cardOpen = []; // setting cards open counter back to zero
                }
        }
    });
  });
};

shuffle(cardList);
cardsStack();
matchingGame()
