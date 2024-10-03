const getAllHousehold = async () => {
  const response = await fetch("http://localhost:8080/api/v1/household", {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  return data.data;
};

const deleteHousehold = async (id) => {
  const response = await fetch(`http://localhost:8080/api/v1/household/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await response.json();
  return data.data;
};

getAllHousehold().then((data) => {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  const formatDate = new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  data.forEach((household) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="px-6 py-4">${household.id}</td>
      <td class="px-6 py-4">${household.chu_ho}</td>
      <td class="px-6 py-4">${formatDate.format(
        new Date(household.ngay_dang_ky)
      )}</td>
      <td class="px-6 py-4">${household.dia_chi}</td>
      <td class="px-6 py-4 text-right">
         <button id="delete-btn" class="font-medium text-red-600 hover:underline">Xoá</button>
      </td>
    `;

    const deleteBtn = row.querySelector("#delete-btn");
    deleteBtn.addEventListener("click", () => {
      deleteHousehold(household.id);
      window.location.reload();
    });
    tableBody.appendChild(row);
  });
});
