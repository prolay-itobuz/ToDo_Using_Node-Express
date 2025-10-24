import "../../scss/Pages/profile.scss";
import { getUserData } from "../api/api.js";

async function getUserInfo() {
  await getUserData();
}

getUserInfo();
