document.addEventListener("DOMContentLoaded", function() {
  const sidebarItems = document.querySelectorAll(".sidebar-item");
  const pageContent = document.getElementById("page-content");

  // Switch page content dynamically
  sidebarItems.forEach(item => {
    item.addEventListener("click", () => {
      // Update sidebar active state
      document.querySelector(".sidebar-item.active").classList.remove("active");
      item.classList.add("active");

      const page = item.dataset.page;
      loadPage(page);
    });
  });

  // Initial page load
  loadPage("home");

  // Load content for each page
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
        break;

      case "account":
        pageContent.innerHTML = `<h1>Account Information</h1><p>Manage your profile here.</p>`;
        break;

      case "payment":
        pageContent.innerHTML = `<h1>Payment Info</h1><p>View balance and make payments here.</p>`;
        break;

      case "schedule":
        pageContent.innerHTML = `<h1>Schedule</h1><p>Calendar goes here.</p>`;
        break;

      case "videos":
        pageContent.innerHTML = `<h1>Practice Videos</h1><p>Video grid goes here.</p>`;
        break;

      case "memories":
        pageContent.innerHTML = `<h1>Memories</h1><p>Upload and view event media here.</p>`;
        break;

      case "notifications":
        pageContent.innerHTML = `<h1>Notifications</h1><p>All notifications will appear here.</p>`;
        break;

      case "messages":
        pageContent.innerHTML = `<h1>Messages</h1><p>Send and receive messages here.</p>`;
        break;

      default:
        pageContent.innerHTML = `<h1>Welcome!</h1>`;
    }
  }

  // Make preview cards clickable
  pageContent.addEventListener("click", function(e) {
    const card = e.target.closest(".preview-card");
    if(card) {
      const targetPage = card.dataset.page;
      const sidebarTarget = document.querySelector(`.sidebar-item[data-page="${targetPage}"]`);
      if(sidebarTarget) sidebarTarget.click();
    }
  });

});
