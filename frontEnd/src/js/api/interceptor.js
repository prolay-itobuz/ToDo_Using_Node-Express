const { fetch: originalFetch } = window;
const BASE_URL = "http://localhost:8000";

const customFetch = async (url, options) => {
  options.headers.Authorization = `Bearer ${localStorage.getItem(
    "access_token"
  )}`;

  let response = await originalFetch(url, options);

  if (response.status === 401) {
    const newResponse = await resetToken();
    const newToken = await newResponse.json();

    localStorage.clear();
    localStorage.setItem("access_token", newToken.access_token);
    localStorage.setItem("refresh_token", newToken.refresh_token);

    options.headers.Authorization = `Bearer ${localStorage.getItem(
      "access_token"
    )}`;

    response = await originalFetch(url, options);

    if (newResponse.status === 401) {
      localStorage.clear();
      window.location.href = "/pages/signin.html";
    }
  } else if (
    !localStorage.getItem("access_token") ||
    !localStorage.getItem("refresh_token")
  ) {
    window.location.href = "/pages/signin.html";
  }

  return (response = await response.json());
};

async function resetToken() {
  const res = await originalFetch(BASE_URL + "/user/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
    },
  });

  return res;
}

export default customFetch;
