import "../../scss/Pages/auth.scss";
import * as authAPI from "../api/authApi.js";
import displayTemplates from "../Dashboard/utils/templates.js";

const taskTemplates = new displayTemplates();

signinForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    email: userMail.value,
    password: userPass.value,
  };
  try {
    const userinfo = await authAPI.loginUser(data);

    if (!userinfo.success) {
      toastSection.innerHTML = taskTemplates.errorToast(userinfo.message);
    } else {
      //login user
      localStorage.setItem("access_token", userinfo.access_token);
      localStorage.setItem("refresh_token", userinfo.refresh_token);

      toastSection.innerHTML = taskTemplates.successToast(userinfo.message);

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  } catch (err) {
    toastSection.innerHTML = taskTemplates.errorToastToast(err.message);
  } finally {
    setTimeout(() => {
      toastSection.innerHTML = "";
    }, 3000);
  }
});
