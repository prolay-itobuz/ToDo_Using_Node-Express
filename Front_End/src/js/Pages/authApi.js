const authAPI = "http://localhost:8000/user/auth/";

// Create User
export async function createUser(userDetails) {
  const res = await fetch(authAPI + "signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userDetails),
  });

  const userinfo = await res.json();
  return userinfo;
}

export async function verifyOTP(id, details) {
  const res = await fetch(authAPI + "otp/" + id, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(details),
  });

  const userinfo = await res.json();
  return userinfo;
}

export async function resendOTP(id) {
  const res = await fetch(authAPI + "resend/" + id, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const userinfo = await res.json();
  return userinfo;
}

export async function reset(mail) {
  const res = await fetch(authAPI + "reset", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mail),
  });

  const userinfo = await res.json();
  return userinfo;
}
