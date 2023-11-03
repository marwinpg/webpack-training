import Heading from "./components/heading/heading";
import RaspberryImage from "./components/raspberry-image/raspberry-image";

const heading = new Heading();
heading.render("raspberry");
const raspberryImage = new RaspberryImage();
raspberryImage.render();

import("HelloWorldApp/HelloWorldButton").then((HelloWorldButtonModule) => {
  const HelloWorldButton = HelloWorldButtonModule.default;
  const helloWorldButton = new HelloWorldButton();
  helloWorldButton.render();
});
