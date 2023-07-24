const userbtn = document.getElementById("adduser");
const btnText = userbtn.innerText;
const usertextField = document.getElementById("username");
const recordsDisplay = document.getElementById("records");

let userArray = [];
let edit_id = null;
const objStr = localStorage.getItem("users");

if (objStr != null) {
  userArray = JSON.parse(objStr);
}

displayInfo();
userbtn.onclick = () => {
  const name = usertextField.value;
  if (edit_id != null) {
    userArray.splice(edit_id, 1, { name: name });
    edit_id = null;
  } else {
    userArray.push({ name: name });
  }

  //   console.log(userArray);
  saveInfo(userArray);
  usertextField.value = "";

  userbtn.innerText = btnText;
};

function saveInfo(userArray) {
  let str = JSON.stringify(userArray);
  localStorage.setItem("users", str);
  displayInfo();
}

function displayInfo() {
  let statement = "";
  userArray.forEach((user, i) => {
    statement += `<tr>
    <th scope="row">${i + 1}</th>
    <td>${user.name}</td>
    <td>
      <i class="btn text-white fa fa-edit btn-info mx-3" onclick='editInfo (${i}) '></i
      ><i class="btn btn-danger text-white fa fa-trash" onclick='deleteInfo(${i})'></i>
    </td>
  </tr>`;
  });
  recordsDisplay.innerHTML = statement;
}
function editInfo(id) {
  edit_id = id;
  usertextField.value = userArray[id].name;
  userbtn.innerText = "Save Changes";
}
function deleteInfo(id) {
  userArray.splice(id, 1);
  saveInfo(userArray);
}
