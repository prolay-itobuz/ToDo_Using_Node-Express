import Helper from "../dashboard/utils/helper.js";

const authAPI = "http://localhost:8000/user/auth";
const details = new Helper();

// Create User
export async function createUser(userDetails) {
  const res = await fetch(
    authAPI + "/signup",
    details.option("POST", userDetails)
  );

  const userinfo = await res.json();
  return userinfo;
}

export async function verifyOtp(id, verifyDetails) {
  const res = await fetch(
    authAPI + "/otp/" + id,
    details.option("POST", verifyDetails)
  );

  const userinfo = await res.json();
  return userinfo;
}

export async function resendOtp(id) {
  const res = await fetch(authAPI + "/resend/" + id, details.option("POST"));

  const userinfo = await res.json();
  return userinfo;
}

export async function reset(mail) {
  const res = await fetch(authAPI + "/reset", details.option("POST", mail));

  const userinfo = await res.json();
  return userinfo;
}

export async function loginUser(userdata) {
  const res = await fetch(authAPI + "/login", details.option("POST", userdata));

  const userinfo = await res.json();
  return userinfo;
}
