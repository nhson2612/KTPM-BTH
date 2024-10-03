const logoutbtn = document.getElementById("logout");
const household = document.getElementById("household");

const getAllHousehold = async () => {
  const response = await fetch("http://localhost:8080/api/v1/household", {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  return data.data;
};

const logout = async () => {
  localStorage.removeItem("user");
  await fetch("http://localhost:8080/api/v1/auth/logout", {
    method: "POST",
    credentials: "include",
  });
};

getAllHousehold().then((data) => {
  console.log("data", data);
  household.textContent = data.length;
});

logoutbtn.addEventListener("click", () => {
  logout();
  window.location.href = "../auth/login.html";
});
