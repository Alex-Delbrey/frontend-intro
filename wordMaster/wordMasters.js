const WORD_URL = "https://words.dev-apis.com/word-of-the-day";
const VALIDATE_URL = "https://words.dev-apis.com/validate-word";
const EMPTY_STRING = "";
const BOX_NAME = "box-";
let i = 1;
let wordGuess = EMPTY_STRING;
let endOfWord = false;

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
};

function backspace() {
  if (i > 1) {
    i--;
  }
  document
    .getElementById(BOX_NAME + i)
    .innerText = EMPTY_STRING;
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

function isAnswer(guess, answer) {
  return guess === answer;
};

function gameState(isValidWord, wordAnswer) {
  if (!isValidWord) {
    for (let wg = 0; wg < wordGuess.length; wg++) {
      document
        .getElementById(BOX_NAME + ((i - 5) + wg))
        .classList
        .add("box-red");
    }
  } else if (isAnswer(wordGuess, wordAnswer)) {
    wordParser(wordAnswer);
    alert("Congrats, you won!");
  } else if (i === 31) {
    alert("GAME ENDED, GET OUTTA HERE");
  } else {
    wordParser(wordAnswer);
    wordGuess = EMPTY_STRING;
    endOfWord = false;
  }
};

function wordParser(wordAnswer) {
  let word = wordAnswer;
  for (let wg = 0; wg < wordGuess.length; wg++) {
    for (let wa = 0; wa < wordAnswer.length; wa++) {
      if (wordGuess.charAt(wg) === wordAnswer.charAt(wa) && wg === wa
        && word.includes(wordGuess.charAt(wg))) {

        word = word.replace(wordGuess.charAt(wg), EMPTY_STRING);
        document
          .getElementById(BOX_NAME + ((i - 5) + wg))
          .classList
          .add("box-green");
        break;
      } else if (wordGuess.charAt(wg) === wordAnswer.charAt(wa)
        && word.includes(wordGuess.charAt(wg))) {

        word = word.replace(wordGuess.charAt(wg), EMPTY_STRING);
        document
          .getElementById(BOX_NAME + ((i - 5) + wg))
          .classList
          .add("box-yellow");
        break;
      } else if (wa === wordAnswer.length - 1) {
        document
          .getElementById(BOX_NAME + ((i - 5) + wg))
          .classList
          .add("box-grey");
        break;
      }
    }
  }
}

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
        .getElementById(BOX_NAME + i)
        .innerText = event.key;
      i++;
    } else if (event.key === "Backspace" && wordGuess != EMPTY_STRING) {
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
