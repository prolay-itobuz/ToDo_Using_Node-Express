import "../../scss/Pages/auth.scss";
import * as authAPI from "../Api/authApi.js";
import displayTemplates from "../Dashboard/utils/templates.js";
import { resendOTP, startTimer } from "../common/otpForm.js";
import { otpSubmit } from "../common/otpForm.js";

const taskTemplates = new displayTemplates();

const inputs = document.querySelectorAll(".otp-input input");

let userid = "";

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userdata = {
    username: username.value,
    email: userMail.value,
    password: userPass.value,
    confirmPassword: userConfirmPassword.value,
  };

  if (userdata.password == userdata.confirmPassword) {
    const userinfo = await authAPI.createUser(userdata);

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

resendButton.addEventListener("click", async () => {
  resendOTP(userid);
});
