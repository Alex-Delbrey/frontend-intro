const WORD_URL = "https://words.dev-apis.com/word-of-the-day";
const VALIDATE_URL = "/validate-word";
const boxName = "box-";
let i = 1;

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
};

// TODO:
// - save word attempt.
// - force user to hit enter after 5th letter
// - user goes to next attempt after enter 
//  if not in last attempt
function gameLogic() {
  document.addEventListener("keydown", function(event) {
    if (isLetter(event.key)) {
      document
        .getElementById(boxName + i)
        .innerText = event.key;
      i++;
    } else if (event.key == "Backspace") {
      if (i > 1) {
        i--;
      }
      document
        .getElementById(boxName + i)
        .innerText = "";
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

  // async function validateWord() {
  //   const promise = await fetch(WORD_URL + VALIDATE_URL, {
  //     method: "POST",
  //     body: JSON.stringify({ "word": "hello" })
  //   });
  // }
}

init();
