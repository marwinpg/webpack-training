import Heading from "../heading/heading";
import RaspberryImage from "../raspberry-image/raspberry-image";

class RaspberryPage {
  render() {
    const heading = new Heading();
    heading.render("raspberry");
    const raspberryImage = new RaspberryImage();
    raspberryImage.render();

    import("ImageCaptionApp/ImageCaption").then((ImageCaptionModule) => {
      const ImageCaption = ImageCaptionModule.default;
      const imageCaption = new ImageCaption();
      imageCaption.render(
        "The raspberry is the edible fruit of a multitude of plant species in the genus Rubus of the rose family"
      );
    });
  }
}

export default RaspberryPage;
