// sidebar.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("sidebar-container");
  if (!container) return;

  fetch("sidebar.html")
    .then(response => response.text())
    .then(data => {
      container.innerHTML = data;

      // Add toggle behavior
      window.toggleSidebar = function() {
        document.getElementById("sidebar").classList.toggle("active");
      };

      // Close sidebar on link click (mobile)
      document.querySelectorAll(".sidebar a").forEach(link => {
        link.addEventListener("click", () => {
          if (window.innerWidth < 1200) {
            document.getElementById("sidebar").classList.remove("active");
          }
        });
      });
    });
});
