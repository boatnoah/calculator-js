const number = document.querySelectorAll(".number");
const display = document.querySelector(".display");
const decimal = document.getElementById("decimal");
const sign = ["*", "-", "+", "/"];
let operate = [];
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
      evaluateDisplay();
    } else if (sign.includes(button.value)) {
      let currentDisplay = display.innerText;
      operate.append(currentDisplay);
      operate.append(button.value);
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

const evaluateDisplay = () => {
  let result = 0;
  for (let i = 0; i < operate.length; i++) {
    if (!sign.includes(operate[i])) {
      result += operate[i];
    } else {
    }
  }
};
