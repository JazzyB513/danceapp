document.addEventListener("DOMContentLoaded", () => {
    const role = localStorage.getItem("selectedRole"); // "student" or "parent"
    
    const studentFields = document.getElementById("studentFields");
    const parentFields = document.getElementById("parentFields");

    console.log("Loaded role:", role);

    // Reveal correct fields
    if (role === "student") {
        studentFields.style.display = "block";
    } 
    
    else if (role === "parent") {
        parentFields.style.display = "block";
        addStudentField(); // Start with one student
    }

    // Add another student button
    const addStudentBtn = document.getElementById("addStudentBtn");
    if (addStudentBtn) {
        addStudentBtn.addEventListener("click", addStudentField);
    }
});

/*  
   Adds a new student input group
*/
function addStudentField() {
    const container = document.getElementById("studentsContainer");

    const wrapper = document.createElement("div");
    wrapper.classList.add("create-group");

    wrapper.innerHTML = `
        <label>Student Name</label>
        <input type="text" name="studentName[]" required />

        <label>Relationship</label>
        <select name="relationship[]" required>
            <option value="">Select one</option>
            <option value="Mother">Mother</option>
            <option value="Father">Father</option>
            <option value="Guardian">Guardian</option>
            <option value="Step-Parent">Step-Parent</option>
            <option value="Other">Other</option>
        </select>
    `;

    container.appendChild(wrapper);
}
