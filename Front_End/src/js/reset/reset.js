import "../../scss/Pages/auth.scss";
import * as authAPI from "../Api/authApi.js";
import displayTemplates from "../Dashboard/utils/templates.js";
import { resendOTP, startTimer } from "../common/otpForm.js";
import { otpSubmit } from "../common/otpForm.js";
import { inputs } from "../common/elements.js";

const taskTemplates = new displayTemplates();

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
    startTimer();
  }

  setTimeout(() => {
    toastSection.innerHTML = "";
  }, 3000);
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

  const data = await authAPI.reset({ id: userid, password: userPass.value });

  if (data.success) {
    toastSection.innerHTML = taskTemplates.successToast(data.message);

    setTimeout(() => {
      window.location.href = "/pages/signin.html";
    }, 1000);
  } else {
    toastSection.innerHTML = taskTemplates.errorToast(data.message);
  }
});

resendButton.addEventListener("click", async () => {
  resendOTP(userid);
});
