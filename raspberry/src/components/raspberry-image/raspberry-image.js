import Raspberry from "./raspberry.jpeg";
import "./raspberry-image.scss";

class RaspberryImage {
  render() {
    const img = document.createElement("img");
    img.src = Raspberry;
    img.alt = "Raspberry";
    img.classList.add("raspberry-image");
    const bodyDomElement = document.querySelector("body");
    bodyDomElement.appendChild(img);
  }
}

export default RaspberryImage;
