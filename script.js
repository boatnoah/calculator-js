const number = document.querySelectorAll(".number");
const display = document.querySelector(".display");
const decimal = document.getElementById("decimal");
const sign = ["*", "-", "+", "/"];
number.forEach((btn) => {
  btn.addEventListener("click", () => {
    showOnDisplay(btn);
  });
});

const showOnDisplay = (button) => {
  if (
    display.innerText.length <= 14 ||
    button.value === "clear" ||
    button.value === "del" ||
    button.value === "="
  ) {
    if (button.value === "clear") {
      display.innerText = "";
      decimal.removeAttribute("disabled", "disabled");
    } else if (button.value === "del") {
      let lastInput = display.innerText.charAt(display.innerText.length - 1);
      if (lastInput === ".") {
        decimal.removeAttribute("disabled");
      }
      display.innerText = display.innerText.slice(0, -1);
    } else if (button.value === "=") {
      evaluate(display.innerText);
    } else if (sign.includes(button.value)) {
      let currentDisplay = display.innerText;
      let lastInput = display.innerText.charAt(currentDisplay.length - 1);
      let nextInput = button.value;
      if (!sign.includes(lastInput) && sign.includes(nextInput)) {
        display.innerText += button.value;
      }
    } else if (button.value === ".") {
      display.innerText += button.value;
      decimal.setAttribute("disabled", "disabled");
    } else {
      display.innerText += button.value;
    }
  }
};

const evaluate = (expression) => {
  const operators = ["+", "-", "*", "/"];
  let currentNumber = "";
  let currentOperator = "+";
  let result = 0;

  const processNumber = () => {
    const num = parseFloat(currentNumber);
    if (!isNaN(num)) {
      if (currentOperator === "+") {
        result += num;
      } else if (currentOperator === "-") {
        result -= num;
      } else if (currentOperator === "*") {
        result *= num;
      } else if (currentOperator === "/") {
        if (num === 0) {
          throw new Error("Division by zero");
        }
        result = Math.round((result / num) * 100) / 100;
      }
    } else {
      throw new Error("Invalid number: " + currentNumber);
    }
    currentNumber = "";
  };

  for (let char of expression) {
    if (operators.includes(char)) {
      processNumber();
      currentOperator = char;
    } else if (char === " ") {
      // Ignore spaces
    } else {
      currentNumber += char;
    }
  }

  // Process the last number
  processNumber();

  display.innerText = result;
};
