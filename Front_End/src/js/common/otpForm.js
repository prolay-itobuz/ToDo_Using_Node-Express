import * as authAPI from "../Api/authApi.js";
import displayTemplates from "../Dashboard/utils/templates.js";
import { inputs } from "./authElements.js";

const taskTemplates = new displayTemplates();

const timerDisplay = document.getElementById("timer");

let timeLeft = 60;
let timerId;

export function startTimer() {
  timerId = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerId);

      timerDisplay.textContent = "Resend OTP";
      resendButton.disabled = false;
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

export async function resendOTP(userid) {
  const resendRequest = await authAPI.resendOTP(userid);

  if (resendRequest.success) {
    toastSection.innerHTML = taskTemplates.successToast(resendRequest.message);
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
}

window.resendOTP = resendOTP;

export async function otpSubmit(otp, taskName, userid) {
  if (otp.length === 4) {
    if (timeLeft > 0) {
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
            "Registration Successful."
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

      setTimeout(() => {
        toastSection.innerHTML = "";
      }, 3000);
    } else {
      toastSection.innerHTML = taskTemplates.errorToast(
        "OTP Expired, Please Resend."
      );

      setTimeout(() => {
        toastSection.innerHTML = "";
      }, 3000);
    }
  } else {
    toastSection.innerHTML = taskTemplates.errorToast(
      "OTP should be 4 digits."
    );

    setTimeout(() => {
      toastSection.innerHTML = "";
    }, 3000);
  }
}
