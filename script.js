const allCheckBox = document.querySelectorAll(".circle");
const inputBox = document.querySelectorAll("input");
const errorMsg = document.querySelector(".error-1");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const progressCount = document.querySelector(".progress-count");

function checkInput() {
  const status = [...inputBox].every((input) => {
    return input.value;
  });
  return status;
}

function displayErrorMsg(state) {
  if (state == 1) {
    progressBar.classList.add("show-error");
  } else {
    progressBar.classList.remove("show-error");
  }
}

function setProgress() {
  const checkedBoxes = document.getElementsByClassName("completed");
  progressValue.style.width = checkedBoxes.length * 33.4 + "%";
  progressCount.innerText = checkedBoxes.length;
}

allCheckBox.forEach((checkBox) => {
  checkBox.addEventListener("click", () => {
    if (checkInput()) {
      checkBox.parentElement.classList.toggle("completed");
      displayErrorMsg(0);
    } else {
      displayErrorMsg(1);
    }
    setProgress();
  });
});

inputBox.forEach((input) => {
  input.addEventListener("focus", () => {
    displayErrorMsg(0);
  });
});
