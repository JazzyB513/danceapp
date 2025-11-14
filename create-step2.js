document.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("role");

  const studentFields = document.getElementById("studentFields");
  const parentFields = document.getElementById("parentFields");

  const addStudentBtn = document.getElementById("addStudentBtn");
  const studentsContainer = document.getElementById("studentsContainer");

  // Show correct fields
  if (role === "student") {
    studentFields.style.display = "block";
  } else if (role === "parent") {
    parentFields.style.display = "block";
    addStudentEntry();
  }

  // Add new student entry
  addStudentBtn?.addEventListener("click", () => {
    addStudentEntry();
  });

  function addStudentEntry() {
    const div = document.createElement("div");
    div.classList.add("student-entry");

    div.innerHTML = `
      <div class="create-group">
        <label>Student Name</label>
        <input type="text" name="studentName[]" required />
      </div>

      <div class="create-group">
        <label>Relationship</label>
        <select name="relationship[]" required>
          <option value="" disabled selected>Select one...</option>
          <option value="Mother">Mother</option>
          <option value="Father">Father</option>
          <option value="Guardian">Guardian</option>
          <option value="Grandparent">Grandparent</option>
          <option value="Sibling">Sibling</option>
        </select>
      </div>
    `;

    studentsContainer.appendChild(div);
  }
});
