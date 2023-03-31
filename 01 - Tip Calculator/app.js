const tipPercentageButtonsDiv = document.getElementById(
    "tip-percentage-buttons"
  ),
  tipResultContainerDiv = document.getElementById("tip-result-container"),
  billAmountInputEl = document.querySelector(".bill-amount-input"),
  peopleAmountInputEl = document.querySelector(".people-amount-input"),
  resetButtonEl = document.querySelector(".reset-button"),
  errorMassages = document.querySelectorAll(".error");

let percentage = 0;
function savePercentageValue(event) {
  event.preventDefault();
  const clickedButton = event.target;
  removeClickedClass();
  clickedButton.classList.add("clicked");
  percentage = clickedButton.value;
}
function saveCustomInputValue() {
  const customInputValue = this.value;
  if (customInputValue !== "" || parseInt(customInputValue) !== 0) {
    percentage = customInputValue;
  }
}
function removeClickedClass() {
  const allPercentageButtons = document.querySelectorAll("button.tip-button");
  allPercentageButtons.forEach((button) => button.classList.remove("clicked"));
}
const percentageArray = [5, 10, 15, 20, 50];
for (let index in percentageArray) {
  const percentage = percentageArray[index];
  const buttonEl = document.createElement("button");
  buttonEl.setAttribute("value", percentage);
  buttonEl.setAttribute("class", "tip-button");
  buttonEl.textContent = `${percentage}%`;
  buttonEl.addEventListener("click", savePercentageValue);
  tipPercentageButtonsDiv.appendChild(buttonEl);
  if (parseInt(index) === percentageArray.length - 1) {
    const customInputEl = document.createElement("input");
    customInputEl.setAttribute("class", "tip-button custom-button");
    customInputEl.setAttribute("type", "text");
    customInputEl.placeholder = "Custom";
    customInputEl.autocomplete = "off";
    customInputEl.autofocus = "on";
    customInputEl.addEventListener("input", saveCustomInputValue);
    customInputEl.addEventListener("focus", removeClickedClass);
    tipPercentageButtonsDiv.appendChild(customInputEl);
  }
}

const result = {
  "Tip Amount": parseFloat(0).toFixed(2),
  Total: parseFloat(0).toFixed(2),
};

for ([key, value] of Object.entries(result)) {
  const tipResultDiv = document.createElement("div");
  tipResultDiv.setAttribute("class", "tip--result--style");
  const tipResultTitleDiv = document.createElement("div");
  tipResultTitleDiv.setAttribute("class", "result-title-style");
  const h3 = document.createElement("h3");
  h3.textContent = key;
  const p = document.createElement("p");
  p.textContent = "/ person";
  tipResultTitleDiv.appendChild(h3);
  tipResultTitleDiv.appendChild(p);
  const tipResultNumberDiv = document.createElement("div");
  tipResultNumberDiv.setAttribute("class", "result-number-style");
  tipResultNumberDiv.textContent = value;
  tipResultDiv.appendChild(tipResultTitleDiv);
  tipResultDiv.appendChild(tipResultNumberDiv);
  tipResultContainerDiv.append(tipResultDiv);
}

const tipEl = tipResultContainerDiv.childNodes[3].lastChild;
const totalEl = tipResultContainerDiv.childNodes[4].lastChild;
const customButtonEl = document.querySelector(".custom-button");
function amountInput(event) {
  const whichInput = event.target.classList[0];
  const bill = parseFloat(billAmountInputEl.value);
  const people = parseInt(peopleAmountInputEl.value);
  if (bill === 0) {
    errorMassages[0].classList.add("bill-error-visible");
    billAmountInputEl.classList.add("input-error");
  } else if (people === 0) {
    errorMassages[1].classList.add("people-error-visible");
    peopleAmountInputEl.classList.add("input-error");
  } else {
    billAmountInputEl.classList.remove("input-error");
    peopleAmountInputEl.classList.remove("input-error");
    errorMassages[0].classList.remove("bill-error-visible");
    errorMassages[1].classList.remove("people-error-visible");

    if (
      isNaN(calculateTip(bill, people, percentage)[0]) ||
      isNaN(calculateTip(bill, people, percentage)[1])
    ) {
      tipEl.textContent = "0.00";
      totalEl.textContent = "0.00";
    } else {
      tipEl.textContent = calculateTip(bill, people, percentage)[0];
      totalEl.textContent = calculateTip(bill, people, percentage)[1];
    }
  }
  if (whichInput === "people-amount-input") {
    resetButtonEl.classList.add("show");
    resetButtonEl.addEventListener("click", resetAll);
  }
}
function calculateTip(billNumber, peopleNumber, percentage) {
  const tip = (billNumber * (0.01 * percentage)) / peopleNumber;
  const total = billNumber / peopleNumber + tip;
  return [tip.toFixed(2), total.toFixed(2)];
}
function resetAll() {
  resetButtonEl.classList.remove("show");
  percentage = 0;
  billAmountInputEl.value = "";
  peopleAmountInputEl.value = "";
  customButtonEl.value = "";
  tipEl.textContent = "0.00";
  totalEl.textContent = "0.00";
  removeClickedClass();
}
