import NavigationBar from "./components/navigation-bar/navigation-bar.js";

const navigationItems = [
  {
    url: "/hello-world-page.html",
    title: "Hello World Page",
  },
  {
    url: "/raspberry-page.html",
    title: "Raspberry Page",
  },
];

const navigationBar = new NavigationBar();
navigationBar.render(navigationItems);

const url = window.location.pathname;

if (url === "/hello-world-page.html") {
  console.log("Hello World Page");
  import("HelloWorldApp/HelloWorldPage")
    .then((HelloWorldPageModule) => {
      const HelloWorldPage = HelloWorldPageModule.default;
      const helloWorldPage = new HelloWorldPage();
      helloWorldPage.render();
    })
    .catch((error) => {
      // Capturar y manejar cualquier error en la cadena de promesas
      console.error("Se produjo un error:", error);
    });
} else if (url === "/raspberry-page.html") {
  import("RaspberryApp/RaspberryPage").then((RaspberryPageModule) => {
    const RaspberryPage = RaspberryPageModule.default;
    const raspberryPage = new RaspberryPage();
    raspberryPage.render();
  });
}

console.log("dashboard");
