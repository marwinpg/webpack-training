import Raspberry from "./raspberry.jpeg";

function addImage() {
  const img = document.createElement("img");
  img.alt = "Raspberry";
  img.width = 300;
  img.src = Raspberry;
  const body = document.querySelector("body");
  body.appendChild(img);
}

export default addImage;
