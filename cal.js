const display = document.querySelector(".display");
const calculator = document.querySelector(".calculator");
const keys = document.querySelector("#calculatorKeys");

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;
    const firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    const secondValue = displayedNum;

    const calculate = (n1, operator, n2) => {
      let result;
      switch (operator) {
        case "add":
          result = parseFloat(n1) + parseFloat(n2);
          break;
        case "subtract":
          result = parseFloat(n1) - parseFloat(n2);
          break;
        case "multiply":
          result = parseFloat(n1) * parseFloat(n2);
          break;
        case "divide":
          result = parseFloat(n1) / parseFloat(n2);
          break;
      }
      return result;
    };

    Array.from(key.parentNode.children).forEach((k) => k.classList.remove("checked"));

    if (!action) {
      if (displayedNum === "0" || previousKeyType === "operator") {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKeyType = "number";
    }

    if (action === "decimal") {
      if (!displayedNum.includes(".")) {
        display.textContent = displayedNum + ".";
      } else if (previousKeyType === "operator" || previousKeyType === "calculate") {
        display.textContent = "0.";
      }
      calculator.dataset.previousKeyType = "decimal";
    }

    if (action === "clear") {
      display.textContent = "0";
      calculator.dataset.firstValue = "";
      calculator.dataset.modValue = "";
      calculator.dataset.operator = "";
      calculator.dataset.previousKeyType = "";
      key.textContent = "AC";
      calculator.dataset.previousKeyType = "clear";
    } else {
      const clearButton = calculator.querySelector('[data-action=clear]');
      clearButton.textContent = "CE";
    }

    if (action === "add" || action === "subtract" || action === "multiply" || action === "divide") {
      if (firstValue && operator && previousKeyType !== "operator" && previousKeyType !== "calculate") {
        const calcValue = calculate(firstValue, operator, displayedNum);
        display.textContent = calcValue;
        calculator.dataset.firstValue = calcValue;
      } else {
        calculator.dataset.firstValue = displayedNum;
      }
      key.classList.add("checked");
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.operator = action;
    }

    if (action === "calculate") {
      if (firstValue) {
        let secondValue = displayedNum;
        if (previousKeyType === "calculate") {
          secondValue = calculator.dataset.modValue;
        }
        display.textContent = calculate(firstValue, operator, secondValue);
        calculator.dataset.modValue = secondValue;
        calculator.dataset.previousKeyType = "calculate";
      }
    }

    key.classList.add("clicked");
  }
});
