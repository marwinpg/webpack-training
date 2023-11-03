import Heading from "../components/heading/heading";
import RaspberryImage from "../components/raspberry-image/raspberry-image";

class RaspberryPage {
  render() {
    const heading = new Heading();
    heading.render("raspberry");
    const raspberryImage = new RaspberryImage();
    raspberryImage.render();
  }
}

export default RaspberryPage;
