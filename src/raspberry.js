import Heading from "./components/heading/heading";
import RaspberryImage from "./components/raspberry-image/raspberry-image";
import _ from "lodash";

const heading = new Heading();
heading.render(_.upperFirst("raspberry"));
const raspberryImage = new RaspberryImage();
raspberryImage.render();
