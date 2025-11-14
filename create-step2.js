// Relationship options list
const RELATIONSHIPS = [
    "Mother",
    "Father",
    "Legal Guardian",
    "Grandparent",
    "Sibling",
    "Aunt",
    "Uncle",
    "Other"
];

// Populate dropdown for a given select element
function populateRelationshipDropdown(selectEl) {
    selectEl.innerHTML = ""; // clear any existing options
    RELATIONSHIPS.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        selectEl.appendChild(opt);
    });
}

// Initial population for first student section
document.querySelectorAll(".relationship-select").forEach(select => {
    populateRelationshipDropdown(select);
});

// Handle adding new student entry
document.getElementById("add-student-btn").addEventListener("click", () => {
    const container = document.getElementById("students-container");

    const studentDiv = document.createElement("div");
    studentDiv.classList.add("student-entry");

    studentDiv.innerHTML = `
        <label>Student Name</label>
        <input type="text" class="student-name" placeholder="Enter student's name" />

        <label>Relationship to Student</label>
        <select class="relationship-select"></select>
    `;

    container.appendChild(studentDiv);

    // Populate new dropdown
    populateRelationshipDropdown(studentDiv.querySelector(".relationship-select"));
});
