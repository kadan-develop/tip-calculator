"use-strict";

const billInput = document.getElementById("bill-amount");
const tipButtons = document.querySelectorAll(".tip-button");
const customTipInput = document.getElementById("custom-tip");
const peopleInput = document.querySelector(".num");
const tipAmountDisplay = document.getElementById("tip-amount");
const totalAmountDisplay = document.getElementById("total-amount");
const resetButton = document.getElementById("reset-button");
const errorMessage = document.getElementById("people-error");

let tipPerc;

function calculateTipAmount(bill, tip) {
  return (bill * tip) / 100;
}

billInput.addEventListener("change", () => {
  resetButton.classList.remove("disabled");
  resetButton.disabled = false;
});

tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tipPerc = e.target.innerText.replace("%", "");
    button.classList.add("active");
  });
});

peopleInput.addEventListener("change", (e) => {
  const tipAmount = calculateTipAmount(billInput.value, Number(tipPerc));

  const customTipAmount =
    customTipInput.value !== 0
      ? calculateTipAmount(billInput.value, Number(customTipInput.value))
      : null;

  const totalTipAmount = tipAmount || customTipAmount;

  const totalAmount = parseFloat(billInput.value) + parseFloat(totalTipAmount);

  const numberOfPeople = peopleInput.value || 1;

  if (+e.target.value === 0) {
    errorMessage.style.display = "block";
    peopleInput.classList.add("no-zero-error");
    return;
  } else {
    errorMessage.style.display = "none";
  }

  tipAmountDisplay.innerText = `$${(totalTipAmount / numberOfPeople).toFixed(
    2
  )}`;

  totalAmountDisplay.innerText = `$${(totalAmount / numberOfPeople).toFixed(
    2
  )}`;
});

resetButton.addEventListener("click", () => {
  //reset inputs
  billInput.value = 0;
  peopleInput.value = 1;
  customTipInput.value = 0;

  tipAmountDisplay.innerText = "$0.00";
  totalAmountDisplay.innerText = "$0.00";

  document.querySelector(".active").classList.remove("active");
});
