const inputs = document.querySelectorAll(".otp-input input");
const timerDisplay = document.getElementById("timer");
const resendButton = document.getElementById("resendButton");
let timeLeft = 300;
let timerId;

export function startTimer() {
  timerId = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerId);
      timerDisplay.textContent = "Code expired";
      resendButton.disabled = false;
      inputs.forEach((input) => (input.disabled = true));
    } else {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerDisplay.textContent = `Time remaining: ${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
      timeLeft--;
    }
  }, 1000);
}

inputs.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    if (e.target.value.length > 1) {
      e.target.value = e.target.value.slice(0, 1);
    }
    if (e.target.value.length === 1) {
      if (index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && !e.target.value) {
      if (index > 0) {
        inputs[index - 1].focus();
      }
    }
    if (e.key === "e") {
      e.preventDefault();
    }
  });
});

export async function resendOTP() {
  const resendRequest = await authAPI.resendOTP(userid);

  if (resendRequest.success) {
    toastSection.innerHTML = taskTemplates.successToast(resendRequest.message);
  } else {
    toastSection.innerHTML = taskTemplates.errorToast(resendRequest.message);
  }

  setTimeout(() => {
    toastSection.innerHTML = "";
  }, 3000);

  timeLeft = 300;
  inputs.forEach((input) => {
    input.value = "";
    input.disabled = false;
  });
  resendButton.disabled = true;
  inputs[0].focus();
  clearInterval(timerId);
  startTimer();
}

window.resendOTP = resendOTP;
