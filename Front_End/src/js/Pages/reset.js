import "../../scss/Pages/signup.scss";
import * as authAPI from "./authApi";
import displayTemplates from "../templates.js";
import { resendOTP, startTimer } from "./otpForm.js";

let timeLeft = 300;

const taskTemplates = new displayTemplates();

const resetVerifyForm = document.getElementById("resetVerifyForm");

const inputs = document.querySelectorAll(".otp-input input");

const toastSection = document.getElementById("toastSection");
const resetFormSection = document.getElementById("resetFormSection");
const otpSection = document.getElementById("otpSection");

const userMail = document.getElementById("userMail");
let userid = "";

resetVerifyForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = await authAPI.reset({ email: userMail.value });

  if (!data.success) {
    toastSection.innerHTML = taskTemplates.errorToast(data.message);
  } else {
    toastSection.innerHTML = taskTemplates.successToast(data.message);
    resetFormSection.classList.add("d-none");
    otpSection.classList.remove("d-none");

    userid = data.user._id;
  }

  setTimeout(() => {
    toastSection.innerHTML = "";
  }, 3000);
});

// otp page js
async function verifyResetOTP() {
  const otp = Array.from(inputs)
    .map((input) => input.value)
    .join("");

  if (otp.length === 4) {
    if (timeLeft > 0) {
      const authVerification = await authAPI.verifyOTP(userid, {
        data: otp,
        task: "reset",
      });

      if (!authVerification.success) {
        toastSection.innerHTML = taskTemplates.errorToast(
          authVerification.message
        );
      } else {
        toastSection.innerHTML = taskTemplates.successToast(
          authVerification.message
        );

        console.log(authVerification);
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
window.verifyResetOTP = verifyResetOTP;

startTimer();
