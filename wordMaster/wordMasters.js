const WORD_URL = "https://words.dev-apis.com/word-of-the-day";
const VALIDATE_URL = "/validate-word";
let boxIdName = "box-";
let i = 1;

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
};

async function init() {

  const promise = await fetch(WORD_URL);
  const wordObject = await promise.json();
  let wordAnswer = wordObject.word;
  // console.log(wordAnswer);
  console.log(boxIdName + i);
  document
    .getElementById(boxIdName + i)
    .addEventListener("keydown", function(event) {
      if (!isLetter(event.key) && event.key != "Backspace") {
        event.preventDefault();
      }
      if (isLetter(event.key)) {
        i++;
        console.log(i)
      } else {
        if (i > 1) {
          i--;
        }
        console.log(i)
      }
    })

  // async function validWord() {
  //   const promise = await fetch(WORD_URL + VALIDATE_URL, {
  //     method: "POST",
  //     body: JSON.stringify({ "word": "hello" })
  //   });
  // }
}

init();
