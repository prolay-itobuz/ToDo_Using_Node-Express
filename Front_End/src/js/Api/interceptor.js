const { fetch: originalFetch } = window;
const ownAPI = "http://localhost:8000/";

const customFetch = async (url, options) => {
  options.headers.Authorization = `Bearer ${localStorage.getItem(
    "access_token"
  )}`;

  let response = await originalFetch(url, options);
  response = await response.json();

  if (!response.success) {
    if (response.message === "jwt expired") {
      console.log("Access Expired");
      const newToken = await resetToken();

      localStorage.clear();
      localStorage.setItem("access_token", newToken.access_token);
      localStorage.setItem("refresh_token", newToken.refresh_token);

      options.headers.Authorization = `Bearer ${localStorage.getItem(
        "access_token"
      )}`;

      response = await originalFetch(url, options);
      response = await response.json();

      if (newToken.message === "jwt expired") {
        localStorage.clear();
        window.location.href = "/pages/signin.html";
      }
    } else if (
      !localStorage.getItem("access_token") ||
      !localStorage.getItem("refresh_token")
    ) {
      window.location.href = "/pages/signin.html";
    }
  }

  return response;
};

async function resetToken() {
  console.log("regenerating tokens");

  const res = await originalFetch(ownAPI + "user/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
    },
  });

  const newToken = await res.json();
  return newToken;
}

export default customFetch;
