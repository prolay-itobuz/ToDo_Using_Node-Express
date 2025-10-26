import "../../scss/Pages/profile.scss";
import { getUserData } from "../api/api.js";
import Templates from "../Dashboard/utils/templates.js";
import * as api from "../api/api.js";

const taskTemplates = new Templates()
const username = document.getElementById("username")
const userEmail = document.getElementById("userEmail")
const createdAt = document.getElementById("createdAt")
const userImage = document.getElementById("userImage")
const profileForm = document.getElementById("profileForm")
const toastSection = document.getElementById("toastSection")
const logoutBth = document.getElementById("logoutBth")
const goBackBtn = document.getElementById("goBackBtn")
const fileInput = document.getElementById("fileInput")

// show profile data
async function getUserInfo() {
  const userData = await getUserData();
  username.innerHTML = userData.userDetails.username
  userEmail.innerHTML = userData.userDetails.email

  const dates = userData.userDetails.createdAt.split('-')
  createdAt.innerHTML = `${dates[2].split("T")[0]} / ${dates[1]} / ${dates[0]}`;

  if (userData.userDetails.imagePath) {
    userImage.setAttribute("src", userData.userDetails.imagePath)
  }
  else {
    userImage.setAttribute("src", "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png")
  }
}

getUserInfo();

// logout functionality
logoutBth.addEventListener("click", async () => {
  localStorage.clear()
  window.location.href = "/pages/login.html"
})

// go back funcionality
goBackBtn.addEventListener("click", async () => {
  window.location.href = "/"
})

//  upload photo 
profileForm.addEventListener("submit", changeImage)

async function changeImage(e) {
  e.preventDefault()

  try {
    const file = fileInput.files[0];
    const formData = new FormData()

    if (!file) {
      toastSection.innerHTML = taskTemplates.errorToast("No image selected")
      return;
    }

    formData.append('DP', file);
    const uploadedContent = await api.uploadPhoto(formData)

    if (uploadedContent.success) {
      toastSection.innerHTML = taskTemplates.successToast(uploadedContent.message)
    }
    else {
      toastSection.innerHTML = taskTemplates.errorToast(uploadedContent.message)
    }
  }
  catch (err) {
    toastSection.innerHTML = taskTemplates.errorToast(err.message)
  }
  finally {
    getUserInfo()
    profileForm.reset()

    setTimeout(() => {
      toastSection.innerHTML = ""
    }, 3000);
  }
}

// preview image
fileInput.addEventListener("change" , previewImage)

function previewImage(){
  const file = fileInput.files[0]

  if(file){
      userImage.src = URL.createObjectURL(file);
  }
}