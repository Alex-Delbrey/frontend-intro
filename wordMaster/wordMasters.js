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

// TODO:
// - CANNOT backspace after valid attempt
// - compare wordGuess to wordAnswer
// - change alert message
// - officialize the end of the game when user wins 
// OR when user runs out of guesses
// -> if valid word: 
// --> paint green if letter is in correct place
// --> paint yellow if letter is part of answer but incorrect spot
function gameLogic() {
  document.addEventListener("keydown", function(event) {
    if (endOfWord) {
      if (event.key === "Enter") {
        validateWord(wordGuess).then(
          (isValid) => {
            if (isValid) {
              wordGuess = "";
              endOfWord = false;
            } else {
              alert("Word is not a word, ya herd?");
            }
          });
      } else if (event.key === "Backspace") {
        backspace();
        endOfWord = false;
      }
      if (i === 31) {
        alert("GAME ENDED, GET OUTTA HERE");
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
    } else if (event.key === "Backspace") {
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
  gameLogic();
}

init();
