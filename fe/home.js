const userId = JSON.parse(localStorage.getItem("user")).id;
const name = document.getElementById("name");
const apartmentId = document.getElementById("apartmentId");

const getHouseholdByUserId = async () => {
  const response = await fetch(
    `http://localhost:8080/api/v1/household/head/${userId}`
  );
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

const household = getHouseholdByUserId().then((data) => {
  const apartmentId = document.getElementById("apartmentId");
  const name = document.getElementById("name");
  apartmentId.textContent = data.id;
  name.textContent = data.chu_ho;
});

const householdDiv = document.getElementById("household");
householdDiv.addEventListener("click", () => {
  window.location.href = `household.html`;
});

const addDiv = document.getElementById("add");
addDiv.addEventListener("click", () => {
  window.location.href = `add.html`;
});

const logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", () => {
  logout();
  window.location.href = `../auth/login.html`;
});
