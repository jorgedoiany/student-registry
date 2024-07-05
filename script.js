document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("record-form");
  const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");
  const emailInput = document.getElementById("email");
  const recordList = document.getElementById("record-list");
  const editIndexInput = document.getElementById("edit-index");

  let records = [
    { name: "John Doe", age: 20, email: "john.doe@example.com", delete: false },
    { name: "Jane Smith", age: 22, email: "jane.smith@example.com" },
    { name: "Emily Johnson", age: 19, email: "emily.johnson@example.com" },
  ];

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value;
    const age = ageInput.value;
    const email = emailInput.value;
    const editIndex = editIndexInput.value;

    if (editIndex === "-1") {
      // Add new record
      records.push({ name, age, email });
    } else {
      // Edit existing record
      records[editIndex] = { name, age, email };
      editIndexInput.value = "-1";
    }

    form.reset();
    renderRecords();
  });

  function renderRecords() {
    recordList.innerHTML = "";
    records.forEach((record, index) => {
      const tr = document.createElement("tr");

      const nameTd = document.createElement("td");
      nameTd.textContent = record.name;
      tr.appendChild(nameTd);

      const ageTd = document.createElement("td");
      ageTd.textContent = record.age;
      tr.appendChild(ageTd);

      const emailTd = document.createElement("td");
      emailTd.textContent = record.email;
      tr.appendChild(emailTd);

      const editTd = document.createElement("td");
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.classList.add("editButton");
      editBtn.addEventListener("click", () => editRecord(index));
      editTd.appendChild(editBtn);
      tr.appendChild(editTd);

      const deleteTd = document.createElement("td");
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("deleteButton");
      deleteBtn.addEventListener("click", () => deleteRecord(index));
      deleteTd.appendChild(deleteBtn);
      tr.appendChild(deleteTd);

      recordList.appendChild(tr);
    });
  }

  function editRecord(index) {
    const record = records[index];
    nameInput.value = record.name;
    ageInput.value = record.age;
    emailInput.value = record.email;
    editIndexInput.value = index;
  }

  function deleteRecord(index) {
    records.splice(index, 1);
    renderRecords();
  }

  // Render the initial records
  renderRecords();
});
