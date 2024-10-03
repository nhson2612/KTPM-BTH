const userId = JSON.parse(localStorage.getItem("user")).id;
let householdId;
const addForm = document.getElementById("add-form");

const getHouseholdByUserId = async () => {
  const response = await fetch(
    `http://localhost:8080/api/v1/household/head/${userId}`
  );
  const data = await response.json();
  return data.data;
};

getHouseholdByUserId().then((data) => {
  householdId = data.id;
});

const addMember = async (memberData) => {
  const response = await fetch(`http://localhost:8080/api/v1/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...memberData,
      ma_ho_khau: householdId,
    }),
    credentials: "include",
  });

  const data = await response.json();
  if (response.ok) {
    alert(data.msg);
  } else {
    alert(data.msg);
  }
};

addForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const ho_va_ten = document.getElementById("ho_va_ten").value;
  const cong_viec = document.getElementById("cong_viec").value;
  const ngay_sinh = document.getElementById("ngay_sinh").value;
  const cccd = document.getElementById("cccd").value;
  const quan_he = document.getElementById("quan_he").value;

  const memberData = {
    ho_va_ten,
    cong_viec,
    ngay_sinh,
    cccd,
    quan_he,
  };
  await addMember(memberData);
  ho_va_ten.value = "";
  cong_viec.value = "";
  ngay_sinh.value = "";
  cccd.value = "";
  quan_he.value = "";
});
