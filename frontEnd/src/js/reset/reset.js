import "../../scss/Pages/auth.scss";
import * as authAPI from "../api/authApi.js";
import displayTemplates from "../Dashboard/utils/templates.js";
import { resendOTP, startTimer } from "../common/otpForm.js";
import { otpSubmit } from "../common/otpForm.js";

const taskTemplates = new displayTemplates();
const inputs = document.querySelectorAll(".otp-input input");
const userMail = document.getElementById("userMail");

let userid = "";
let email = "";

resetVerifyForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    email = userMail.value;
    const data = await authAPI.reset({ email: email });

    if (!data.success) {
      toastSection.innerHTML = taskTemplates.errorToast(data.message);
    } else {
      toastSection.innerHTML = taskTemplates.successToast(data.message);
      resetFormSection.classList.add("d-none");
      otpSection.classList.remove("d-none");

      userid = data.user._id;
      startTimer();
    }
  } catch (err) {
    toastSection.innerHTML = taskTemplates.errorToast(err.message);
  } finally {
    setTimeout(() => {
      toastSection.innerHTML = "";
    }, 3000);
  }
});

// otp page js
otpSection.addEventListener("submit", async (e) => {
  e.preventDefault();

  const otp = Array.from(inputs)
    .map((input) => input.value)
    .join("");

  otpSubmit(otp, "reset", userid);
});

// set password form
resetVerifyPass.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    if (userConfirmPassword.value === userPass.value) {
      const data = await authAPI.reset({
        email: email,
        id: userid,
        password: userPass.value,
      });

      if (data.success) {
        toastSection.innerHTML = taskTemplates.successToast(data.message);

        setTimeout(() => {
          window.location.href = "/pages/signin.html";
        }, 1000);
      } else {
        toastSection.innerHTML = taskTemplates.errorToast(data.message);
      }
    } else {
      toastSection.innerHTML = taskTemplates.errorToast(
        "Password and Confirm Password don't match."
      );
    }
  } catch (err) {
    toastSection.innerHTML = taskTemplates.errorToast(err.message);
  } finally {
    setTimeout(() => {
      toastSection.innerHTML = "";
    }, 3000);
  }
});

resendButton.addEventListener("click", async () => {
  resendOTP(userid);
});
