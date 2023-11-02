import "./hello-world-button.scss";

class HelloWorldButton {
  buttonCssClass = "hello-world-button"; // buttonClass is a property
  render() {
    const button = document.createElement("button");
    const body = document.querySelector("body");
    button.innerHTML = "Hello World";
    button.onclick = function () {
      const p = document.createElement("p");
      p.innerHTML = "Hello World";
      p.classList.add("hello-world-text");
      body.appendChild(p);
    };
    button.classList.add(this.buttonCssClass);
    body.appendChild(button);
  }
}

// const double = (x) => x * 2;
// const addOne = (x) => x + 1;

// const result = 1 |> double |> addOne;

export default HelloWorldButton;
