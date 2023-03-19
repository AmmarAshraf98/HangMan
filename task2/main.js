const letters = "abcdefghijklmnopqrstuvwxyz";

//convert string to array
const lettersArray = Array.from(letters);

//select div wich is container for letters
const lettersContainer = document.querySelector(".letters");
const innerContainer = document.querySelector(".innerContainer");

// looop to generate box for leeters
lettersArray.map((e) => {
  //create box for leeter
  let span = document.createElement("span");

  //create textnode to carry letter
  let theLetter = document.createTextNode(e);

  //append leeter to span
  span.appendChild(theLetter);

  //add class for each span
  span.className = "letterBox";

  //append each span to the container
  innerContainer.appendChild(span);

  //append each span to the container
});
lettersContainer.appendChild(innerContainer);

// obj for words
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

// get allkeys from object
let allKeys = Object.keys(words);

//generate random number from 0 to 3 as the number of my keys
let numKeys = Math.floor(Math.random() * allKeys.length);

// generate random keys
const randomkeyName = allKeys[numKeys];

// generate random key value
const randomkeyValue = words[randomkeyName];

// generate random key value
const randomPropValue =
  randomkeyValue[Math.floor(Math.random() * randomkeyValue.length)];
// select span to set category
document.querySelector(".game-info .category span").innerHTML = randomkeyName;

//select the guess div wich contain span
let guessletter = document.querySelector(".guess-letter");

//convert the choseen word to array
let letterAndSpace = Array.from(randomPropValue.toLowerCase());

//create span depend on letters and space
letterAndSpace.map((e) => {
  //create span
  let spn = document.createElement("span");

  //add letters and space to span
  if (e === " ") {
    // spn.createTextNode(e);
    //   if letter is space add className to span
    spn.className = "empSpan";
  }

  //   add span with letters to guess div
  guessletter.appendChild(spn);
});

//loop on span for guess letter
let guessSpan = document.querySelectorAll(".guess-letter span");

// console.log(letterAndSpace); //choosen word

//set the wrong attempts
let theWrongAttemps = 0;

//select The draw element
let TheDraw = document.querySelector(".hangman-draw");
// console.log((TheDraw));

// add event for each letter i clicked
document.addEventListener("click", (e) => {
  //set chose status
  let theStatus = false;
  if (e.target.className === "letterBox") {
    e.target.classList.add("clicked");
    //get clicked letter
    let clickedLetter = e.target.innerHTML.toLowerCase();

    //loop foreach span
    letterAndSpace.forEach((wordLetter, wordIndex) => {
      //if clicked letter = one letter of the choosen word
      if (wordLetter === clickedLetter) {
        //set the status true for out of loop
        theStatus = true;

        //loop on all spans
        guessSpan.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = clickedLetter;
          }
        });
      }
    });
    //out of loop

    //if letter is wrong
    if (theStatus !== true) {
      //increase the wrong attempts
      theWrongAttemps += 1;

      //add class wrong to the draw element
      TheDraw.classList.add(`wrong-${theWrongAttemps}`);

      //play fail sound sound
      document.getElementById("failure").play();

      //   if wrong attepts wrong 8 times
      if (theWrongAttemps === 8) {
        endGame();
        lettersContainer.classList.add("finished");
      }
    } else {
      //play success sound sound
      document.getElementById("success").play();
    }
  }
});


//end game function
function endGame(){
    let div = document.createElement("div");
    let divtext = document.createTextNode(`Game Over The Word Is :  ${randomPropValue} !`);
    div.appendChild(divtext);
    div.className = 'popUp';
    document.body.appendChild(div);
}