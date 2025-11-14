// calendar.js
document.addEventListener("DOMContentLoaded", function () {
  const eventsPath = "data/events.json"; // ensure this file exists (see below)
  const tabs = document.querySelectorAll(".tab");
  const modal = document.getElementById("eventModal");
  const closeBtn = modal.querySelector(".close-btn");

  // Modal elements
  const modalTitle = document.getElementById("modalTitle");
  const modalTime = document.getElementById("modalTime");
  const modalType = document.getElementById("modalType");
  const modalDescription = document.getElementById("modalDescription");
  const modalStudents = document.getElementById("modalStudents");
  const modalLocation = document.getElementById("modalLocation");

  let allEvents = [];

  // color mapping by type
  const colorMap = {
    practice: "#f7d1ea",    // pastel pink
    rehearsal: "#c8b6ff",   // lavender
    performance: "#ffd89e", // warm gold
    dayoff: "#d9d9d9",      // grey
    default: "#a8d5e2"
  };

  // fetch events JSON
  fetch(eventsPath)
    .then(r => {
      if (!r.ok) throw new Error("Failed to load events.json");
      return r.json();
    })
    .then(data => {
      // Convert to FullCalendar's expected format
      allEvents = data.events.map(e => ({
        id: e.id,
        title: e.title,
        start: e.start,         // ISO datetime expected
        end: e.end || null,
        extendedProps: {
          type: e.type,
          students: e.students || [],
          description: e.description || "",
          location: e.location || ""
        },
        color: colorMap[e.type] || colorMap.default
      }));

      initCalendar(); // after events loaded
    })
    .catch(err => console.error(err));

  let calendar; // FullCalendar instance

  function initCalendar() {
    const calendarEl = document.getElementById("calendar");

    calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,listWeek'
      },
      events: allEvents,
      eventClick: function(info) {
        const ev = info.event;
        openModalForEvent(ev);
      },
      eventDisplay: 'block',
      height: 'auto',
      // make event content more readable
      dayMaxEventRows: true
    });

    calendar.render();
  }

  // filter and show events for a given student (or "all")
  function showEventsFor(student) {
    // remove existing events
    calendar.removeAllEvents();

    const filtered = student === "all"
      ? allEvents
      : allEvents.filter(ev => (ev.extendedProps.students || []).includes(student));

    // add the filtered events
    filtered.forEach(ev => calendar.addEvent(ev));
  }

  // tabs behavior
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // ui classes
      document.querySelector(".tab.active").classList.remove("active");
      tab.classList.add("active");

      const student = tab.dataset.student;
      showEventsFor(student);
    });
  });

  // Modal logic
  function openModalForEvent(ev) {
    modalTitle.textContent = ev.title;

    // format time range nicely
    const start = ev.start ? formatDateTime(ev.start) : "";
    const end = ev.end ? formatDateTime(ev.end) : "";
    modalTime.textContent = end ? `${start} — ${end}` : start;

    modalType.textContent = ev.extendedProps.type || "";
    modalDescription.textContent = ev.extendedProps.description || "";
    modalStudents.textContent = (ev.extendedProps.students || []).join(", ") || "—";
    modalLocation.textContent = ev.extendedProps.location || "—";

    modal.style.display = "block";
  }

  closeBtn.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });

  // helper: format dates (local)
  function formatDateTime(d) {
    const dt = new Date(d);
    // e.g., "Feb 14, 2025 5:00 PM"
    return dt.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  }
});
