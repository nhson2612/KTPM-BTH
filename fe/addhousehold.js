const addForm = document.getElementById("add-form");
const chu_ho = document.getElementById("chu_ho");
const ngay_dang_ky = document.getElementById("ngay_dang_ky");
const dia_chi = document.getElementById("dia_chi");
const headId = document.getElementById("headId");

const addHousehold = async () => {
  const householdData = {
    chu_ho: chu_ho.value,
    ngay_dang_ky: ngay_dang_ky.value,
    dia_chi: dia_chi.value,
    headId: headId.value,
  };
  const response = await fetch("http://localhost:8080/api/v1/household", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(householdData),
    credentials: "include",
  });
  const data = await response.json();
  if (response.ok) {
    alert(data.msg);
    window.location.href = "./dashboard.html";
  } else {
    alert(data.msg);
  }
};

addForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await addHousehold();
});
