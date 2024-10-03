const userId = JSON.parse(localStorage.getItem("user")).id;

const getHouseholdByUserId = async () => {
  const response = await fetch(
    `http://localhost:8080/api/v1/household/head/${userId}`
  );
  const data = await response.json();
  return data.data;
};

const getMembersByHouseholdId = async () => {
  const household = await getHouseholdByUserId();
  const householdId = household.id;
  const response = await fetch(
    `http://localhost:8080/api/v1/household/${householdId}/members`
  );
  const data = await response.json();
  return data.data;
};

getMembersByHouseholdId().then((data) => {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  const formatDate = new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  data.forEach((member) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="px-6 py-4">${member.ho_va_ten}</td>
      <td class="px-6 py-4">${formatDate.format(
        new Date(member.ngay_sinh)
      )}</td>
      <td class="px-6 py-4">${member.cccd}</td>
      <td class="px-6 py-4">${member.quan_he}</td>
      <td class="px-6 py-4">${member.cong_viec}</td>
      <td class="px-6 py-4 text-right">
         <a href="http://localhost:3000/edit?id=${
           member.id
         }" class="font-medium text-blue-600 hover:underline">Edit</a>
      </td>
    `;
    tableBody.appendChild(row);
  });
});
