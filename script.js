const allCheckBox = document.querySelectorAll(".circle");
const inputBox = document.querySelectorAll("input");
const errorMsg = document.querySelector(".error-1");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const progressCount = document.querySelector(".progress-count");

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
}

function setState(goalObject, key) {
  goalObject[key].state = goalObject[key].state ? false : true;
  localStorage.setItem("allGoals", JSON.stringify(allGoals));
}

allCheckBox.forEach((checkBox) => {
  checkBox.addEventListener("click", () => {
    if (checkInput()) {
      checkBox.parentElement.classList.toggle("completed");
      const key = checkBox.classList[1];
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
      input.parentElement.classList.toggle("completed");
      setProgress();
    }
  } else {
    console.log("No data found");
  }

  input.addEventListener("input", (e) => {
    allGoals[input.id] = {
      state: "",
      data: input.value,
    };
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
