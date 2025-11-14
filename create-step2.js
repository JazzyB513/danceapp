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

document.getElementById("add-student-btn").addEventListener("click", function () {
  const container = document.getElementById("student-container");

  const newEntry = document.createElement("div");
  newEntry.classList.add("student-entry");

  newEntry.innerHTML = `
    <div class="create-group">
      <label>Student Name</label>
      <input type="text" name="studentName[]" placeholder="Enter student name" required>
    </div>

    <div class="create-group">
      <label>Relationship to Student</label>
      <select name="relationship[]" required>
        <option value="">Select relationship</option>
        <option value="Mother">Mother</option>
        <option value="Father">Father</option>
        <option value="Guardian">Guardian</option>
        <option value="Step-Parent">Step-Parent</option>
        <option value="Grandparent">Grandparent</option>
        <option value="Sibling">Sibling</option>
        <option value="Other">Other</option>
      </select>
    </div>
  `;

  container.appendChild(newEntry);
});
