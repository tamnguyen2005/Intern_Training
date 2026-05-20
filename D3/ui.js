import Calculator from "./calculator.js";

const calculator = new Calculator();

const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const historyList = document.getElementById("history-list");

function render() {
  display.value = calculator.getDisplay();

  historyList.innerHTML = "";

  calculator.getHistory().forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (value) {
      calculator.append(value);
    }

    if (action === "clear") {
      calculator.clear();
    }

    if (action === "equals") {
      calculator.calculate();
    }

    render();
  });
});

render();
