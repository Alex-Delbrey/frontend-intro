const WORD_URL = "https://words.dev-apis.com/word-of-the-day";
const VALIDATE_URL = "https://words.dev-apis.com/validate-word";
const boxName = "box-";
let i = 1;
let wordGuess = "";
let endOfWord = false;

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
};

function backspace() {
  if (i > 1) {
    i--;
  }
  document
    .getElementById(boxName + i)
    .innerText = "";
  wordGuess = wordGuess.substring(0, wordGuess.length - 1);
}

async function validateWord(wordToValidate) {
  const promise = await fetch(VALIDATE_URL, {
    method: "post",
    body: JSON.stringify({ "word": wordToValidate })
  });
  const validatedWord = await promise.json();
  return validatedWord.validWord;
}

function compareGuess(guess, answer) {
  return guess === answer;
};

function gameState(isValidWord, wordAnswer) {
  if (!isValidWord) {
    // document
    //   .getElementById(boxName + (i - 1))
    //   .classList
    //   .add("box-color");
    alert("Word is not a word, ya herd?");
  } else if (compareGuess(wordGuess, wordAnswer)) {
    alert("Congrats, you won!");
  } else if (i === 31) {
    alert("GAME ENDED, GET OUTTA HERE");
  } else {
    wordGuess = "";
    endOfWord = false;
    console.log("Word is valid, but not the answer");
  }
};

// TODO:
// OR when user runs out of guesses
// -> if valid word: 
// --> paint green if letter is in correct place
// --> paint yellow if letter is part of answer but incorrect spot
// turn all boxes from white to red, then 
// red to white WHEN word is invalid
function gameLogic(wordAnswer) {
  document.addEventListener("keydown", function(event) {
    if (endOfWord) {
      if (event.key === "Enter") {
        validateWord(wordGuess).then(
          (isValid) => {
            gameState(isValid, wordAnswer);
          });
      } else if (event.key === "Backspace") {
        backspace();
        endOfWord = false;
      }
    } else if (isLetter(event.key)) {
      wordGuess += event.key;
      if (i % 5 === 0) {
        endOfWord = true;
      }
      document
        .getElementById(boxName + i)
        .innerText = event.key;
      i++;
    } else if (event.key === "Backspace" && wordGuess != "") {
      backspace();
    } else {
      event.preventDefault();
    }
  });
}

async function init() {
  const promise = await fetch(WORD_URL);
  const wordObject = await promise.json();
  let wordAnswer = wordObject.word;
  gameLogic(wordAnswer);
}

init();
