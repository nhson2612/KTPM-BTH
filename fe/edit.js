const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const ho_va_ten = document.getElementById("ho_va_ten");
const cong_viec = document.getElementById("cong_viec");
const ngay_sinh = document.getElementById("ngay_sinh");
const cccd = document.getElementById("cccd");
const quan_he = document.getElementById("quan_he");
const editForm = document.getElementById("edit-form");
const deleteBtn = document.getElementById("delete-btn");

const getMemberById = async () => {
  const response = await fetch(`http://localhost:8080/api/v1/members/${id}`);
  const data = await response.json();
  return data.data;
};

getMemberById().then((data) => {
  ho_va_ten.value = data.ho_va_ten;
  cong_viec.value = data.cong_viec;
  ngay_sinh.value = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(data.ngay_sinh));
  cccd.value = data.cccd;
  quan_he.value = data.quan_he;
});

const updateMember = async (memberData) => {
  const response = await fetch(`http://localhost:8080/api/v1/members/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memberData),
  });
  const data = await response.json();
  if (response.ok) {
    alert(data.msg);
  } else {
    alert(data.msg);
  }
  return data;
};

editForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const memberData = {
    ho_va_ten: ho_va_ten.value,
    cong_viec: cong_viec.value,
    ngay_sinh: ngay_sinh.value,
    cccd: cccd.value,
    quan_he: quan_he.value,
  };

  await updateMember(memberData);
});

const deleteMember = async () => {
  const response = await fetch(`http://localhost:8080/api/v1/members/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (response.ok) {
    alert(data.msg);
  } else {
    alert(data.msg);
  }
  return data;
};

deleteBtn.addEventListener("click", async () => {
  await deleteMember();
  window.location.href = "../household.html";
});
