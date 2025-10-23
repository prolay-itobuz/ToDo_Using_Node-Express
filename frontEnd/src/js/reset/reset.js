import "../../scss/Pages/auth.scss";
import * as authApi from "../api/authApi.js";
import displayTemplates from "../Dashboard/utils/templates.js";
import { otpSubmit } from "../common/otpForm.js";

const taskTemplates = new displayTemplates();
const passwordSection = document.getElementById("passwordSection");
const userMail = document.getElementById("userMail");
const otpSection = document.getElementById("otpSection");
const resetVerifyForm = document.getElementById("resetVerifyForm");
const toastSection = document.getElementById("toastSection");
const timer = document.getElementById("timer");
const resendButton = document.getElementById("resendButton");

resetVerifyForm.addEventListener("submit", formSubmit);

let userId;

async function formSubmit(e) {
  e.preventDefault();
  try {
    const email = userMail.value;
    const data = await authApi.reset({ email: email });

    if (!data.success) {
      toastSection.innerHTML = taskTemplates.errorToast(data.message);
    } else {
      toastSection.innerHTML = taskTemplates.successToast(data.message);
      otpSection.classList.remove("d-none");
      passwordSection.classList.remove("d-none");
      redirectLink.classList.add("d-none");

      userId = data.user._id;
      startTimer();
    }
  } catch (err) {
    toastSection.innerHTML = taskTemplates.errorToast(err.message);
  } finally {
    setTimeout(() => {
      toastSection.innerHTML = "";
    }, 3000);
  }
}

resendButton.addEventListener("click", async () => {
  try {
    const resendRequest = await authApi.resendOtp(userId);

    if (resendRequest.success) {
      toastSection.innerHTML = taskTemplates.successToast(
        resendRequest.message
      );
      resendButton.classList.add("d-none");
      timer.classList.remove("d-none");

      startTimer();
    } else {
      toastSection.innerHTML = taskTemplates.errorToast(resendRequest.message);
    }
  } catch (err) {
    toastSection.innerHTML = taskTemplates.errorToast(err.message);
  } finally {
    setTimeout(() => {
      toastSection.innerHTML = "";
    }, 3000);
  }
});

function startTimer() {
  let timeLeft = 60;
  const timerId = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerId);

      resendButton.classList.remove("d-none");
      timer.classList.add("d-none");
    } else {
      resendButton.classList.add("d-none");
      timer.classList.remove("d-none");
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;

      timer.textContent = `Resend ${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
      timeLeft--;
    }
  }, 1000);
}
