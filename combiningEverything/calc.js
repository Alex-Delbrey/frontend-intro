let total = 0;
let numButton = false;
let operand = "";
let inputNum;

const plus = (num2) => {
  return total + parseInt(num2);
};

const sub = (num2) => {
  return total - num2;
};

const div = (num2) => {
  return total / num2;
};

const mult = (num2) => {
  return total * parseInt(num2);
};

const clr = () => {
  inputNum = 0;
  return 0;
};

const del = (str) => {
  if (str.length > 1) {
    return str.substring(0, str.length - 1);
  } else {
    return "0";
  }
}

const isNum = () => {
  return numButton;
}

const buttonClick = document.querySelectorAll("button");

for (let i = 0; i < buttonClick.length; i++) {
  const currentElement = buttonClick[i];
  currentElement.addEventListener("click", function() {
    const className = currentElement.className;
    switch (className) {
      case "clear":
        total = clr();
        document
          .querySelector(".total")
          .innerText = total;
        console.log(`CLASSNAME: ${className} TOTAL: ${total}`);
        break;
      case "del":
        const numToDel = document
          .querySelector(".total")
          .innerText;
        total = parseInt(del(numToDel));
        document
          .querySelector(".total")
          .innerText = total;
        console.log(`CLASSNAME: ${className} TOTAL: ${total}`);
        break;
      case "div":
        numButton = false;
        total = parseInt(document
          .querySelector(".total")
          .innerText);

        operand = className;
        console.log(`CLASSNAME: ${className} TOTAL: ${total}`);
        break;
      case "mult":
        numButton = false;
        total = parseInt(document
          .querySelector(".total")
          .innerText);
        operand = className;
        console.log(`CLASSNAME: ${className} TOTAL: ${total}`);
        break;
      case "minus":
        numButton = false;
        total = parseInt(document
          .querySelector(".total")
          .innerText);
        operand = className;
        console.log(`CLASSNAME: ${className} TOTAL: ${total}`);
        break;
      case "plus":
        numButton = false;
        total = parseInt(document
          .querySelector(".total")
          .innerText);
        operand = className;
        console.log(`CLASSNAME: ${className} TOTAL: ${total}`);
        break;
      case "equal":
        switch (operand) {
          case "div":
            total = div(inputNum);
            document
              .querySelector(".total")
              .innerText = total;
            console.log(`CLASSNAME: ${className} TOTAL: ${total}`);
            break;
          case "mult":
            total = mult(inputNum);
            document
              .querySelector(".total")
              .innerText = total;
            console.log(`CLASSNAME: ${className} TOTAL: ${total}`);
            break;
          case "minus":
            total = sub(inputNum);
            document
              .querySelector(".total")
              .innerText = total;
            console.log(`CLASSNAME: ${className} TOTAL: ${total}`);
            break;
          case "plus":
            total = plus(inputNum);
            document
              .querySelector(".total")
              .innerText = total;
            console.log(`CLASSNAME: ${className} TOTAL: ${total}`);
            break;
        }
        document
          .querySelector(".total")
          .innerText = total;
        console.log(`CLASSNAME: ${className} TOTAL: ${total}`);
        break;

      default:
        inputNum = parseInt(document
          .querySelector("." + className).innerText);
        if (isNum()) {
          inputNum = document
            .querySelector(".total")
            .innerText += inputNum;
        } else {
          document
            .querySelector(".total")
            .innerText = inputNum;
          numButton = true;
        }
        console.log(`CLASSNAME: ${className} INPUTNUM: ${inputNum} TOTAL: ${total}`);
    }
  });
}
