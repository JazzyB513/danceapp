document.addEventListener("DOMContentLoaded", () => {
    const eventList = document.getElementById("eventList");
    const studentTabs = document.querySelectorAll("#studentTabs li");
    const scheduleTitle = document.getElementById("scheduleTitle");

    let allEvents = [];

    // Load JSON file
    fetch("events.json")
        .then(response => response.json())
        .then(data => {
            allEvents = data.events;
            displayEvents("all");
        })
        .catch(error => console.error("Error loading events:", error));


    // Display events filtered by student
    function displayEvents(student) {
        eventList.innerHTML = "";

        const filteredEvents = student === "all"
            ? allEvents
            : allEvents.filter(ev => ev.student === student);

        filteredEvents.forEach(ev => {
            const card = document.createElement("div");
            card.classList.add("event-card");

            card.innerHTML = `
                <h3>${ev.title}</h3>
                <p><strong>Date:</strong> ${ev.date}</p>
                <p><strong>Student:</strong> ${ev.student}</p>
            `;

            // Click opens modal
            card.addEventListener("click", () => openModal(ev));

            eventList.appendChild(card);
        });

        scheduleTitle.textContent = student === "all" ? "All Events" : student + "'s Schedule";
    }

    // Handle tab click
    studentTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelector("#studentTabs .active").classList.remove("active");
            tab.classList.add("active");
            displayEvents(tab.dataset.student);
        });
    });

    // ------- Modal Logic -------
    const modal = document.getElementById("eventModal");
    const closeBtn = document.querySelector(".close-btn");

    function openModal(ev) {
        document.getElementById("modalTitle").textContent = ev.title;
        document.getElementById("modalDate").textContent = ev.date;
        document.getElementById("modalTime").textContent = ev.time;
        document.getElementById("modalType").textContent = ev.type;
        document.getElementById("modalNotes").textContent = ev.notes;

        modal.style.display = "block";
    }

    closeBtn.addEventListener("click", () => modal.style.display = "none");

    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });
});
