import "../../scss/Pages/auth.scss";
import * as authAPI from "../Api/authApi.js";
import displayTemplates from "../Dashboard/utils/templates.js";
import { resendOTP, startTimer } from "../common/otpForm.js";
import { otpSubmit } from "../common/otpForm.js";

const taskTemplates = new displayTemplates();

const signupForm = document.getElementById("signupForm");
const signupFormSection = document.getElementById("signupFormSection");
const toastSection = document.getElementById("toastSection");
const otpSection = document.getElementById("otpSection");

const userName = document.getElementById("userName");
const userMail = document.getElementById("userMail");
const userPass = document.getElementById("userPass");
const inputs = document.querySelectorAll(".otp-input input");

let userid = "";

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userdata = {
    username: userName.value,
    email: userMail.value,
    password: userPass.value,
  };

  const userinfo = await authAPI.createUser(userdata);

  if (userinfo.success) {
    //redirect otp page
    otpSection.classList.remove("d-none");
    signupFormSection.classList.add("d-none");
    toastSection.innerHTML = taskTemplates.successToast("Success, OTP Sent");

    const temp = userinfo.user._id || userinfo.user[0]._id;
    userid = temp.toString();

    startTimer();
  } else {
    toastSection.innerHTML = taskTemplates.errorToast("User Already Exists.");
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

  otpSubmit(otp, "verify", userid);
});

const resendButton = document.getElementById("resendButton");
resendButton.addEventListener("click", async () => {
  resendOTP(userid);
});
