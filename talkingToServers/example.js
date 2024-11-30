const dog = {
  name: "Fiji",
};
let x = JSON.stringify(dog);
console.log(dog);
console.log(x);

const DOG_URL = "https://dog.ceo/api/breeds/image/random";

let doggos = document.getElementById("dog-target");

async function addNewDogo() {
  const promise = await fetch(DOG_URL);
  const dogObject = await promise.json();
  const img = document.createElement("img");
  img.src = dogObject.message;
  img.alt = "Cutie doggy";
  doggos.appendChild(img);
}

document.getElementById("dog-btn")
  .addEventListener("click", addNewDogo);
