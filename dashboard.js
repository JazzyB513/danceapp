document.addEventListener("DOMContentLoaded", function () {
  const sidebarItems = document.querySelectorAll(".sidebar-item");
  const pageContent = document.getElementById("page-content");

  // Current student filter (optional, e.g., if you want per student filtering later)
  let currentStudent = "all";

  // Sidebar tab click handler
  sidebarItems.forEach(item => {
    item.addEventListener("click", () => {
      // Set active class
      document.querySelector(".sidebar-item.active").classList.remove("active");
      item.classList.add("active");

      const page = item.dataset.page;
      loadPage(page);
    });
  });

  // Initial load: Home
  loadPage("home");

  // Load content for a given tab
  function loadPage(page) {
    switch (page) {
      case "home":
        loadHome();
        break;
      case "account":
        pageContent.innerHTML = `<h1>Account Information</h1><p>Manage your profile here.</p>`;
        break;
      case "payment":
        loadPayments();
        break;
      case "schedule":
        loadSchedule();
        break;
      case "videos":
        loadVideos();
        break;
      case "memories":
        loadMemories();
        break;
      case "notifications":
        loadNotifications();
        break;
      case "messages":
        loadMessages();
        break;
      default:
        pageContent.innerHTML = `<h1>Welcome!</h1>`;
    }
  }

  /** --------------------------
   * Home Preview Cards
   * -------------------------- */
  function loadHome() {
    pageContent.innerHTML = `
      <h1>Welcome!</h1>
      <div class="preview-grid">
        <div class="preview-card" data-page="notifications">
          <h3>Latest Notifications</h3>
          <ul id="preview-notifications"><li>Loading...</li></ul>
        </div>
        <div class="preview-card" data-page="videos">
          <h3>Latest Practice Video</h3>
          <ul id="preview-videos"><li>Loading...</li></ul>
        </div>
        <div class="preview-card" data-page="schedule">
          <h3>Next Upcoming Event</h3>
          <ul id="preview-events"><li>Loading...</li></ul>
        </div>
      </div>
    `;

    // Fetch previews dynamically
    fetch("notifications.json")
      .then(r => r.json())
      .then(data => {
        const ul = document.getElementById("preview-notifications");
        ul.innerHTML = data.notifications.length
          ? data.notifications.slice(0,3).map(n => `<li>${n.title}</li>`).join("")
          : "<li>No notifications</li>";
      });

    fetch("video.json")
      .then(r => r.json())
      .then(data => {
        const ul = document.getElementById("preview-videos");
        ul.innerHTML = data.videos.length
          ? data.videos.slice(-1).map(v => `<li>${v.title}</li>`).join("")
          : "<li>No videos</li>";
      });

    fetch("schedule.json")
      .then(r => r.json())
      .then(data => {
        const ul = document.getElementById("preview-events");
        ul.innerHTML = data.events.length
          ? data.events.slice(0,1).map(e => `<li>${e.title} — ${e.start}</li>`).join("")
          : "<li>No upcoming events</li>";
      });
  }

  /** --------------------------
   * Payments Tab
   * -------------------------- */
  function loadPayments() {
    fetch("payment.json")
      .then(r => r.json())
      .then(data => {
        let html = `<h1>Payment Info</h1>`;
        data.students.forEach(s => {
          html += `
            <h2>${s.name} — Total Due: $${s.totalDue}</h2>
            <ul>
              ${s.charges.map(c => `<li>${c.desc}: $${c.amount}</li>`).join("")}
              ${s.discounts.map(d => `<li>${d.desc}: -$${d.amount}</li>`).join("")}
            </ul>
            <p>Next Auto Pay: ${s.nextAutoPay}</p>
          `;
        });
        pageContent.innerHTML = html;
      });
  }

  /** --------------------------
   * Schedule Tab
   * -------------------------- */
  function loadSchedule() {
    pageContent.innerHTML = `<h1>Schedule</h1><div id="calendar">Loading...</div>`;

    // You can integrate FullCalendar here, or just show a simple list for demo
    fetch("schedule.json")
      .then(r => r.json())
      .then(data => {
        const cal = document.getElementById("calendar");
        if (!data.events.length) {
          cal.innerHTML = "<p>No events yet.</p>";
          return;
        }
        let html = "<ul>";
        data.events.forEach(e => {
          html += `<li>${e.title} — ${e.start}</li>`;
        });
        html += "</ul>";
        cal.innerHTML = html;
      });
  }

  /** --------------------------
   * Practice Videos Tab
   * -------------------------- */
  function loadVideos() {
    pageContent.innerHTML = `<h1>Practice Videos</h1><div id="videoGrid" class="video-grid">Loading...</div>`;

    fetch("video.json")
      .then(r => r.json())
      .then(data => {
        const grid = document.getElementById("videoGrid");
        if (!data.videos.length) {
          grid.innerHTML = "<p>No videos yet.</p>";
          return;
        }
        let html = "";
        data.videos.forEach(v => {
          html += `
            <div class="video-card">
              <video controls src="${v.url}"></video>
              <div class="video-info">
                <h3>${v.title}</h3>
                <p>${v.description}</p>
              </div>
            </div>
          `;
        });
        grid.innerHTML = html;
      });
  }

  /** --------------------------
   * Memories Tab
   * -------------------------- */
  function loadMemories() {
    pageContent.innerHTML = `<h1>Memories</h1><div id="memoryGrid" class="video-grid">Loading...</div>`;

    fetch("memories.json")
      .then(r => r.json())
      .then(data => {
        const grid = document.getElementById("memoryGrid");
        if (!data.events.length) {
          grid.innerHTML = "<p>No memories yet.</p>";
          return;
        }
        let html = "";
        data.events.forEach(event => {
          event.media.forEach(m => {
            if(m.type === "image") {
              html += `<div class="video-card"><img src="${m.url}" alt="${m.description}"/><div class="video-info"><h3>${event.title}</h3><p>${m.description}</p></div></div>`;
            } else if(m.type === "video") {
              html += `<div class="video-card"><video controls src="${m.url}"></video><div class="video-info"><h3>${event.title}</h3><p>${m.description}</p></div></div>`;
            }
          });
        });
        grid.innerHTML = html;
      });
  }

  /** --------------------------
   * Notifications Tab
   * -------------------------- */
  function loadNotifications() {
    fetch("notifications.json")
      .then(r => r.json())
      .then(data => {
        let html = `<h1>Notifications</h1>`;
        if (!data.notifications.length) html += "<p>No notifications yet.</p>";
        else {
          html += "<ul>";
          data.notifications.forEach(n => {
            html += `<li><strong>${n.title}:</strong> ${n.message}</li>`;
          });
          html += "</ul>";
        }
        pageContent.innerHTML = html;
      });
  }

  /** --------------------------
   * Messages Tab
   * -------------------------- */
  function loadMessages() {
    fetch("messages.json")
      .then(r => r.json())
      .then(data => {
        let html = `<h1>Messages</h1>`;
        if (!data.messages.length) html += "<p>No messages yet.</p>";
        else {
          html += "<ul>";
          data.messages.forEach(m => {
            html += `<li><strong>From:</strong> ${m.from} <strong>Subject:</strong> ${m.subject}<br/>${m.body}</li>`;
          });
          html += "</ul>";
        }
        pageContent.innerHTML = html;
      });
  }

  // Preview card click behavior
  pageContent.addEventListener("click", function (e) {
    const card = e.target.closest(".preview-card");
    if (card) {
      const page = card.dataset.page;
      document.querySelector(`.sidebar-item[data-page="${page}"]`).click();
    }
  });
});
