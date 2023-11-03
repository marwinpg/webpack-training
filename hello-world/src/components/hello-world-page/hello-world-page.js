import HelloWorldButton from "../hello-world-button/hello-world-button";
import Heading from "../heading/heading";

class HelloWorldPage {
  render() {
    const heading = new Heading();
    heading.render("hello-world");
    const helloWorldButton = new HelloWorldButton();
    helloWorldButton.render();
  }
}

export default HelloWorldPage;
