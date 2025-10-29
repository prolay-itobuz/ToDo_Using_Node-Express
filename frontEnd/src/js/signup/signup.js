import "../../scss/Pages/auth.scss";
import * as authApi from "../api/authApi.js";
import displayTemplates from "../Dashboard/utils/Templates.js";
import { resendOtp, startTimer } from "../common/otpForm.js";
import { otpSubmit } from "../common/otpForm.js";

const taskTemplates = new displayTemplates();
const inputs = document.querySelectorAll(".otp-input input");
const signupForm = document.getElementById("signupForm");
const username = document.getElementById("username");
const userMail = document.getElementById("userMail");
const userPass = document.getElementById("userPass");
const userConfirmPassword = document.getElementById("userConfirmPassword");
const otpSection = document.getElementById("otpSection");
const signupFormSection = document.getElementById("signupFormSection");
const toastSection = document.getElementById("toastSection");
const resendButton = document.getElementById("resendButton");
let userid = "";

signupForm.addEventListener("submit", handleSignup);

async function handleSignup(e) {
  try {
    e.preventDefault();

    const userdata = {
      username: username.value,
      email: userMail.value,
      password: userPass.value,
      confirmPassword: userConfirmPassword.value,
    };

    if (userdata.password == userdata.confirmPassword) {
      const userinfo = await authApi.createUser(userdata);

      if (userinfo.success) {
        //redirect otp page
        otpSection.classList.remove("d-none");
        signupFormSection.classList.add("d-none");
        toastSection.innerHTML = taskTemplates.successToast(userinfo.message);

        const temp = userinfo.user._id || userinfo.user[0]._id;
        userid = temp.toString();

        startTimer();
      } else {
        toastSection.innerHTML = taskTemplates.errorToast(userinfo.message);
      }
    } else {
      toastSection.innerHTML = taskTemplates.errorToast(
        "Confirm password not matched."
      );
    }
  } catch (err) {
    toastSection.innerHTML = taskTemplates.errorToast(err.message);
  } finally {
    setTimeout(() => {
      toastSection.innerHTML = "";
    }, 3000);
  }
}

// otp page js
otpSection.addEventListener("submit", async (e) => {
  e.preventDefault();

  const otp = Array.from(inputs)
    .map((input) => input.value)
    .join("");

  otpSubmit(otp, "verify", userid);
});

resendButton.addEventListener("click", async () => {
  resendOtp(userid);
});
