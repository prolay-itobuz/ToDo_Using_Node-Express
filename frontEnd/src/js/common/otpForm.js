import * as authAPI from "../api/authApi.js";
import Templates from "../dashboard/utils/templates.js";

const taskTemplates = new Templates();
const inputs = document.querySelectorAll(".otp-input input");
const toastSection = document.getElementById("toastSection");

let timeLeft = 60;
let timerId;

export function startTimer() {
  timerId = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerId);

      timer.textContent = "Resend OTP";
      resendButton.disabled = false;
    } else {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;

      timer.textContent = `Time remaining: ${minutes}:${seconds
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

export async function resendOTP(userid) {
  try {
    const resendRequest = await authAPI.resendOTP(userid);

    if (resendRequest.success) {
      toastSection.innerHTML = taskTemplates.successToast(
        resendRequest.message
      );
    } else {
      toastSection.innerHTML = taskTemplates.errorToast(resendRequest.message);
    }

    setTimeout(() => {
      toastSection.innerHTML = "";
    }, 3000);

    timeLeft = 60;
    inputs.forEach((input) => {
      input.value = "";
      input.disabled = false;
    });

    resendButton.disabled = true;
    inputs[0].focus();

    clearInterval(timerId);
    startTimer();
  } catch (err) {
    toastSection.innerHTML = taskTemplates.errorToast(err.message);
  }
}

window.resendOTP = resendOTP;

export async function otpSubmit(otp, taskName, userid) {
  try {
    const authVerification = await authAPI.verifyOTP(userid, {
      data: otp,
      task: taskName,
    });

    if (!authVerification.success) {
      toastSection.innerHTML = taskTemplates.errorToast(
        authVerification.message
      );
    } else {
      if (taskName === "verify") {
        toastSection.innerHTML = taskTemplates.successToast(
          authVerification.message
        );

        setTimeout(() => {
          window.location.href = "/pages/signin.html";
        }, 1000);
      } else {
        toastSection.innerHTML = taskTemplates.successToast(
          authVerification.message
        );

        otpSection.classList.add("d-none");
        resetPasswordForm.classList.remove("d-none");

        setTimeout(() => {
          toastSection.innerHTML = "";
        }, 3000);
      }
    }
  } catch (err) {
    toastSection.innerHTML = taskTemplates.errorToast(err.message);
  }
}
