const allCheckBox = document.querySelectorAll(".circle");
const inputBox = document.querySelectorAll("input");
const errorMsg = document.querySelector(".error-1");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const progressCount = document.querySelector(".progress-count");
const quote = document.querySelector(".progress-label");

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};

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
  if (checkedBoxes.length == 1) {
    quote.innerText = "Well Done! Complete other two";
  } else if (checkedBoxes.length == 2) {
    quote.innerText = "One More. Let's Go!";
  } else if (checkedBoxes.length == 3) {
    quote.innerText = "Enjoy Your Day :)";
  } else {
    quote.innerText = "Raise the bar by completing your goals!";
  }
}

function setState(goalObject, key) {
  goalObject[key].state = !goalObject[key].state;
  localStorage.setItem("allGoals", JSON.stringify(allGoals));
}

allCheckBox.forEach((checkBox) => {
  checkBox.addEventListener("click", () => {
    if (checkInput()) {
      checkBox.parentElement.classList.toggle("completed");
      const key = checkBox.nextElementSibling.id;
      setState(allGoals, key);
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

  if (allGoals[input.id]) {
    input.value = allGoals[input.id].data;
    if (allGoals[input.id].state) {
      input.parentElement.classList.add("completed");
      setProgress();
    }
  }

  input.addEventListener("input", (e) => {
    if (allGoals[input.id].state) {
      e.target.value = allGoals[input.id].data;
      return;
    }
    allGoals[input.id] = {
      state: "",
      data: input.value,
    };
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
