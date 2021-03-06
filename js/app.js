/*
 * Create a list that holds all of your cards
 */

function startGame() { // this function activates when the user presses the Start Game button

  // creating an array with all of the card shapes
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
    var cardOpen = []; //variable to determing number of cards open
    var matchingCards = 0; // variable to keep counter of matching cards
    var moves = 0; // variable to keep moves counter
    var starLost = 0; // variable to store star rating

  ///////////////////////////////////////////////////////////////////////////////////////

    // creating timer for the game
    var seconds = document.querySelector('.seconds');
    var minutes = document.querySelector('.minutes');

    seconds.textContent = "00";
    minutes.textContent = "00";
    var beginTimer = true; //varible to stop the timer when the game ends
    var second = 0;

    function timerStart( val ) {
      if (beginTimer == true) {
        return val > 9 ? val : "0" + val;
      }
    }

    setInterval( function(){
        seconds.innerHTML=timerStart(++second%60);
        minutes.innerHTML=timerStart(parseInt(second/60,10));
    }, 1000);
  ///////////////////////////////////////////////////////////////////////////////////////



  ///////////////////////////////////////////////////////////////////////////////////////
    cards.forEach( function(card) {
      card.addEventListener('click', function(event) {

          cardOpen.push(card.firstElementChild.className);

  ///////////////////////////////////////////////////////////////////////////////////////
          moves += 1;
          var movesUpdate = document.querySelector('.moves');
          movesUpdate.textContent = moves;
  ///////////////////////////////////////////////////////////////////////////////////////



  ///////////////////////////////////////////////////////////////////////////////////////
          if (moves == 20) {
            var star = document.querySelector('.fa-star');
            star.classList.remove('fa-star');
            starLost = 1;
          } else if (moves == 50) {
            var star = document.querySelector('.fa-star');
            star.classList.remove('fa-star');
            starLost = 2;
          }
  ///////////////////////////////////////////////////////////////////////////////////////



  ///////////////////////////////////////////////////////////////////////////////////////
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
                    beginTimer = false; //stopping timer
                    var sec = seconds.innerText; // setting sec variable to final second value
                    var min = minutes.innerText; // setting min variable to final minute value

                    setTimeout(function() {
                        var score = document.querySelector('.score-panel'); //selecting and removing score-panel from the body
                        score.remove();
                        var deck = document.querySelector('.deck'); //selecting and removing deck from the body
                        deck.remove();

                        var span = document.createElement('span') // creating span element to show the Congratulations message
                        document.body.appendChild(span);

                        span.setAttribute("style", "text-align: center;"); // styling the span

                        //using pre tag to be able to use new-line string
                        span.innerHTML = "<pre>" + 'Congratulations! You Won!!!' + '\n\n' +
                        'You finished the game in ' + min + ' minute(s) & ' + sec +
                        ' seconds \nwith ' + moves + ' move(s) & ' + parseInt(3-starLost) + ' star(s)' + '\n\nWoooHooooo!!!' + "</pre>";

                        var btn = document.createElement('button'); // creating button for restarting the game
                        btn.textContent = 'Restart Game';
                        btn.setAttribute("style", "width: 50%; text-align: center; margin-left: 25%; margin-right: 25%");

                        document.body.appendChild(btn);
                        btn.addEventListener('click' , function() {
                          location.reload();
                        })
                    }, 300);

                  }

                  } else if (cardOpen.length == 2 && cardOpen[0] != cardOpen[1]) { //checking if the cards do not match

                        var flip = document.querySelectorAll('.open', '.show') //finding all cards with class open & show

                        flip.forEach ( function(flips) {
                          flips.classList.add('unmatch');
                          setTimeout(function() {
                            flips.classList.remove('open','show') //removing class open & show from open cards
                          }, 300);
                          setTimeout(function() {
                            flips.classList.remove('unmatch') //removing class open & show from open cards
                          }, 100);
                        });

                        cardOpen = []; // setting cards open counter back to zero
                  }
          }
  ///////////////////////////////////////////////////////////////////////////////////////



  ///////////////////////////////////////////////////////////////////////////////////////
          var repeat = document.querySelector('.restart');

          // Giving user option to restart the game
          repeat.addEventListener('click', function(event) {
            location.reload();
          });
  ///////////////////////////////////////////////////////////////////////////////////////
      }); //end of eventLisnter function
    }); //end of forEach function
  ///////////////////////////////////////////////////////////////////////////////////////
  }; //end of matchingGame function

  shuffle(cardList);
  cardsStack();
  matchingGame();
};
