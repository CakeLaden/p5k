function addHelloWorld() {
  const helloWorldElement = document.createElement("h1");
  helloWorldElement.textContent = "Hello World";
  document.body.appendChild(helloWorldElement);
}

addHelloWorld();