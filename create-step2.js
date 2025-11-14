document.getElementById("add-student-btn").addEventListener("click", function () {
  const container = document.getElementById("student-container");

  const newField = document.createElement("div");
  newField.classList.add("create-group");
  newField.innerHTML = `
    <label>Student Name</label>
    <input type="text" name="studentName[]" placeholder="Enter another student name">
  `;

  container.appendChild(newField);
});
