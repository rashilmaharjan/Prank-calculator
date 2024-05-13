// const handleOnButtonClick = (btn) => {
//     console.log(btn);
// }

const allButtonsElm = document.querySelectorAll(".btn");

let strToDisplay = "";
const displayElm = document.querySelector(".display");

const operators = ["%", "/", "*", "-", "+"];

let lastOperator = "";

//load the audio
const audio = new Audio("./assets/error.mp3");

const buttonAction = (value) => {
  displayElm.classList.add("prank");
  //detecting everything
  //   console.log(value);

  if (value === "AC") {
    strToDisplay = "";
    return display(strToDisplay);
  }

  if (value === "C") {
    strToDisplay = strToDisplay.slice(0, -1);
    return display(strToDisplay);
  }

  if (value === "=" || value === "Enter") {
    lastOperator = "";
    //get the last character
    const lastChar = strToDisplay[strToDisplay.length - 1];

    // check if it is one of the operators
    if (operators.includes(lastChar)) {
      strToDisplay = strToDisplay.slice(0, -1);
    }
    return displayTotal();
  }
  //show only last clicked operator
  if (operators.includes(value)) {
    lastOperator = value;
    //get the last char
    const lastChar = strToDisplay[strToDisplay.length - 1];

    if (operators.includes(lastChar)) {
      strToDisplay = strToDisplay.slice(0, -1);
    }
  }

  //handle the dot click

  if (value === ".") {
    const lastOperatorIndex = strToDisplay.lastIndexOf(lastOperator);

    const lastNumberSet = strToDisplay.slice(lastOperatorIndex);

    if (lastNumberSet.includes(".")) {
      return;
    }

    if (!lastOperator && strToDisplay.includes(".")) {
      return;
    }
  }
  strToDisplay += value;

  display(strToDisplay);
};

//attache click event to all the buttons
allButtonsElm.forEach((btn) => {
  btn.addEventListener("mousedown", () => {
    btn.style.scale = ".9";
  });

  btn.addEventListener("click", () => {
    btn.style.scale = "1";
    const value = btn.innerText;
    buttonAction(value);
  });
});

//update clicked button value to display area
const display = (str) => {
  displayElm.innerText = str || "0.0";
};

//calculate Total
const displayTotal = () => {
  const extravalue = randomValue();
  if (extravalue) {
    displayElm.classList.add("prank");
    audio.play();
  }
  const total = eval(strToDisplay) + extravalue;

  strToDisplay = total.toString();
  display(total);
};

const randomValue = () => {
  const num = Math.round(Math.random() * 10); //0-10
  return num < 8 ? num : 0;
};

//binding keyboard with browser app
document.addEventListener("keypress", (e) => {
  console.log(e);
  const value = e.key;
  if (e.code.includes("key")) {
    return;
  }
  buttonAction(value);
});
