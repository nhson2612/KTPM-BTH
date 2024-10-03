document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.msg);
        localStorage.setItem("user", JSON.stringify(data.data));
        window.location.href = "../home.html";
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  });
});
