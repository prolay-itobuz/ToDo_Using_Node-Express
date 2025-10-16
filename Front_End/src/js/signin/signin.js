import "../../scss/Pages/auth.scss";
import * as authAPI from "../Api/authApi.js";
import displayTemplates from "../Dashboard/templates.js";

const taskTemplates = new displayTemplates();

const toastSection = document.getElementById("toastSection");
const signinForm = document.getElementById("signinForm");

const userMail = document.getElementById("userMail");
const userPass = document.getElementById("userPass");

signinForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    email: userMail.value,
    password: userPass.value,
  };

  const userinfo = await authAPI.loginUser(data);

  if (!userinfo.success) {
    toastSection.innerHTML = taskTemplates.errorToast(userinfo.message);
  } else {
    //login
    localStorage.setItem("access_token", userinfo.access_token);
    localStorage.setItem("refresh_token", userinfo.refresh_token);

    toastSection.innerHTML = taskTemplates.successToast(userinfo.message);

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  }

  setTimeout(() => {
    toastSection.innerHTML = "";
  }, 3000);

  console.log(userinfo);
});
