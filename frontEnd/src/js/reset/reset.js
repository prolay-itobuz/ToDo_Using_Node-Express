import "../../scss/Pages/auth.scss";
import * as authApi from "../api/authApi.js";
import displayTemplates from "../Dashboard/utils/templates.js";

const taskTemplates = new displayTemplates();
const passwordSection = document.getElementById("passwordSection");
const userMail = document.getElementById("userMail");
const userOtp = document.getElementById("userOtp");
const otpSection = document.getElementById("otpSection");
const userPass = document.getElementById("userPass");
const resetVerifyForm = document.getElementById("resetVerifyForm");
const toastSection = document.getElementById("toastSection");
const timer = document.getElementById("timer");
const resendButton = document.getElementById("resendButton");
const redirectLink = document.getElementById("redirectLink");
let userId;

resetVerifyForm.addEventListener("submit", formSubmit);

async function formSubmit(e) {
  e.preventDefault();
  try {
    const email = userMail.value;
    const data = await authApi.reset({
      email: email,
      otp: userOtp.value,
      password: userPass.value,
    });

    if (!data.success) {
      toastSection.innerHTML = taskTemplates.errorToast(data.message);
    } else {
      toastSection.innerHTML = taskTemplates.successToast(data.message);
      otpSection.classList.remove("d-none");
      passwordSection.classList.remove("d-none");
      redirectLink.classList.add("d-none");
      userPass.setAttribute("required", "");
      userOtp.setAttribute("required", "");

      if (data.message == "Password updated successfully") {
        setTimeout(() => {
          window.location.href = "/pages/signin.html";
        }, 1000);
      }

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

resendButton.addEventListener("click", resendOtpBtn);

async function resendOtpBtn() {
  try {
    const resendRequest = await authApi.resendOtp(userId);

    if (resendRequest.success) {
      toastSection.innerHTML = taskTemplates.successToast(
        resendRequest.message
      );

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
}

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
