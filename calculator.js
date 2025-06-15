document.addEventListener("DOMContentLoaded", function () {
  // DOM elements selection
  const output = document.getElementById("output");
  const buttons = document.querySelectorAll(".buttons button");
  const operators = document.querySelectorAll(".button_operators button");
  const clearButton = document.querySelector(".clearButton");
  const equalToButton = document.querySelector(".equalTo");
  const deleteButton = document.querySelector("#delete");

  // Variables
  let newInput = "0";
  let oldInput = "";
  let operation = undefined;
  let clearScreen = false;

  // Update the calculator display
  function updateDisplay() {
    output.value = newInput;
  }

  // Append number to current display
  function addNumber(number) {
    if (newInput === "0" || clearScreen) {
      newInput = number;
      clearScreen = false;
    } else {
      newInput += number;
    }
  }

  // Handle decimal point
  function addDecimal() {
    if (clearScreen) {
      newInput = "0.";
      clearScreen = false;
      return;
    }
    if (!newInput.includes(".")) {
      newInput += ".";
    }
  }

  // Choose operation
  function chooseOperation(op) {
    if (newInput === "") return;
    if (oldInput !== "") {
      compute();
    }

    // Replace symbols for calculation
    switch (op) {
      case "x":
        operation = "*";
        break;
      case "÷":
        operation = "/";
        break;
      case "^":
        operation = "**";
        break;
      default:
        operation = op;
    }

    oldInput = newInput;
    newInput = "";
    clearScreen = false;
  }

  // Compute the calculation
  function compute() {
    let input;
    const prev = parseFloat(oldInput);
    const current = parseFloat(newInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
      case "+":
        input = prev + current;
        break;
      case "-":
        input = prev - current;
        break;
      case "*":
        input = prev * current;
        break;
      case "/":
        input = prev / current;
        break;
      case "**":
        input = prev ** current;
        break;
      default:
        return;
    }

    newInput = input.toString();
    operation = undefined;
    oldInput = "";
    clearScreen = true;
  }

  // Clear calculator
  function clear() {
    newInput = "0";
    oldInput = "";
    operation = undefined;
  }

  // Delete last character
  function deleteChar() {
    if (
      newInput.length === 1 ||
      (newInput.length === 2 && newInput.startsWith("-"))
    ) {
      newInput = "0";
    } else {
      newInput = newInput.slice(0, -1);
    }
  }

  // Number button event listeners
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.textContent === ".") {
        addDecimal();
      } else {
        addNumber(button.textContent);
      }
      updateDisplay();
    });
  });

  // Operator button event listeners
  operators.forEach((button) => {
    button.addEventListener("click", () => {
      chooseOperation(button.textContent);
      updateDisplay();
    });
  });

  // Equal button event listener
  equalToButton.addEventListener("click", () => {
    compute();
    updateDisplay();
  });

  // Clear button event listener
  clearButton.addEventListener("click", () => {
    clear();
    updateDisplay();
  });

  // Delete button event listener
  deleteButton.addEventListener("click", () => {
    deleteChar();
    updateDisplay();
  });
  // Initialize display
  updateDisplay();
});
