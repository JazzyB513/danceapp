document.addEventListener("DOMContentLoaded", function() {
  const sidebarItems = document.querySelectorAll(".sidebar-item");
  const pageContent = document.getElementById("page-content");
  const modal = document.getElementById("modal");
  const closeBtn = modal.querySelector(".close-btn");

  // Modal elements
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalMedia = document.getElementById("modalMedia");
  const modalTime = document.getElementById("modalTime");
  const modalLocation = document.getElementById("modalLocation");
  const modalStudents = document.getElementById("modalStudents");
  const downloadBtn = document.getElementById("downloadBtn");

  let calendar;
  let allEvents = [];
  let allVideos = [];
  let allMemories = [];

  // ---------------- Sidebar click logic ----------------
  sidebarItems.forEach(item => {
    item.addEventListener("click", () => {
      document.querySelector(".sidebar-item.active").classList.remove("active");
      item.classList.add("active");
      loadPage(item.dataset.page);
    });
  });

  // ---------------- Load JSON data ----------------
  async function loadData() {
    // Schedule events
    const scheduleResp = await fetch("schedule.json");
    const scheduleJSON = await scheduleResp.json();
    allEvents = scheduleJSON.events;

    // Videos
    const videoResp = await fetch("video.json");
    const videoJSON = await videoResp.json();
    allVideos = videoJSON.videos;

    // Memories
    const memoriesResp = await fetch("memories.json");
    const memoriesJSON = await memoriesResp.json();
    allMemories = memoriesJSON.events;

    // Previews
    loadHomePreviews();
  }

  function loadHomePreviews() {
    const previewEvents = document.getElementById("preview-events");
    const previewVideos = document.getElementById("preview-videos");
    const previewNotifications = document.getElementById("preview-notifications");

    // Upcoming Event
    if(allEvents.length > 0) {
      previewEvents.innerHTML = `<li>${allEvents[0].title} (${allEvents[0].start})</li>`;
    } else previewEvents.innerHTML = "<li>No upcoming events</li>";

    // Latest Video
    if(allVideos.length > 0) {
      previewVideos.innerHTML = `<li>${allVideos[0].title}</li>`;
    } else previewVideos.innerHTML = "<li>No videos yet</li>";

    // Notifications placeholder
    previewNotifications.innerHTML = "<li>No notifications yet</li>";
  }

  // ---------------- Load each page ----------------
  function loadPage(page) {
    switch(page) {
      case "home":
        pageContent.innerHTML = `
          <h1>Welcome!</h1>
          <div class="preview-grid">
            <div class="preview-card" data-page="notifications">
              <h3>Latest Notifications</h3>
              <ul id="preview-notifications"><li>No notifications yet</li></ul>
            </div>
            <div class="preview-card" data-page="videos">
              <h3>Latest Practice Video</h3>
              <ul id="preview-videos"><li>No videos yet</li></ul>
            </div>
            <div class="preview-card" data-page="schedule">
              <h3>Next Upcoming Event</h3>
              <ul id="preview-events"><li>No upcoming events</li></ul>
            </div>
          </div>
        `;
        loadHomePreviews();
        break;

      case "videos":
        pageContent.innerHTML = `<h1>Practice Videos</h1><div id="videoGrid" class="video-grid"></div>`;
        loadVideos();
        break;

      case "schedule":
        pageContent.innerHTML = `<h1>Schedule</h1><div id="calendar"></div>`;
        loadCalendar();
        break;

      case "memories":
        pageContent.innerHTML = `<h1>Memories</h1><div id="memoriesGrid" class="video-grid"></div>`;
        loadMemories();
        break;

      case "payment":
        pageContent.innerHTML = `<h1>Payment Info</h1><p>View balance and make payments here.</p>`;
        break;

      case "account":
        pageContent.innerHTML = `<h1>Account Information</h1><p>Manage your profile here.</p>`;
        break;

      case "notifications":
        pageContent.innerHTML = `<h1>Notifications</h1><p>No notifications yet.</p>`;
        break;

      case "messages":
        pageContent.innerHTML = `<h1>Messages</h1><p>Send and receive messages here.</p>`;
        break;

      default:
        pageContent.innerHTML = `<h1>Welcome!</h1>`;
    }
  }

  // ---------------- Video Grid ----------------
  function loadVideos() {
    const videoGrid = document.getElementById("videoGrid");
    videoGrid.innerHTML = allVideos.map(v => `
      <div class="video-card" data-title="${v.title}" data-url="${v.url}">
        <video src="${v.url}" controls></video>
        <div class="video-info">
          <h3>${v.title}</h3>
          <p>${v.description}</p>
        </div>
      </div>
    `).join("");

    // Add modal click
    videoGrid.querySelectorAll(".video-card").forEach(card => {
      card.addEventListener("click", () => {
        modalTitle.textContent = card.dataset.title;
        modalMedia.innerHTML = `<video src="${card.dataset.url}" controls></video>`;
        modal.style.display = "block";
      });
    });
  }

  // ---------------- Memories ----------------
  function loadMemories() {
    const memoriesGrid = document.getElementById("memoriesGrid");
    memoriesGrid.innerHTML = allMemories.map(m => `
      <div class="video-card" data-title="${m.title}" data-url="${m.url}">
        <img src="${m.url}" alt="${m.title}" />
        <div class="video-info">
          <h3>${m.title}</h3>
          <p>${m.description}</p>
        </div>
      </div>
    `).join("");

    memoriesGrid.querySelectorAll(".video-card").forEach(card => {
      card.addEventListener("click", () => {
        modalTitle.textContent = card.dataset.title;
        modalMedia.innerHTML = `<img src="${card.dataset.url}" />`;
        modal.style.display = "block";
      });
    });
  }

  // ---------------- Schedule ----------------
  function loadCalendar() {
    const calendarEl = document.getElementById("calendar");

    calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      headerToolbar: { left:'prev,next today', center:'title', right:'dayGridMonth,timeGridWeek,listWeek' },
      events: allEvents.map(e => ({
        id: e.id,
        title: e.title,
        start: e.start,
        end: e.end || null,
        extendedProps: { description: e.description, location: e.location, students: e.students }
      })),
      eventClick: function(info) {
        const ev = info.event;
        modalTitle.textContent = ev.title;
        modalDescription.textContent = ev.extendedProps.description;
        modalTime.textContent = ev.start.toLocaleString();
        modalLocation.textContent = ev.extendedProps.location;
        modalStudents.textContent = ev.extendedProps.students.join(", ");
        modal.style.display = "block";
      }
    });

    calendar.render();
  }

  // ---------------- Modal ----------------
  closeBtn.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", e => { if(e.target === modal) modal.style.display = "none"; });

  // ---------------- Clickable preview cards ----------------
  pageContent.addEventListener("click", e => {
    const card = e.target.closest(".preview-card");
    if(card) {
      const targetPage = card.dataset.page;
      const sidebarTarget = document.querySelector(`.sidebar-item[data-page="${targetPage}"]`);
      if(sidebarTarget) sidebarTarget.click();
    }
  });

  // ---------------- Initialize ----------------
  loadData();
});
