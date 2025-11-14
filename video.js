document.addEventListener("DOMContentLoaded", () => {
  const studentTabs = document.querySelectorAll(".student-tab");
  const videoContainer = document.getElementById("videoContainer");

  fetch("video.json")
    .then(res => res.json())
    .then(data => {
      window.videoData = data.students; // store globally
    })
    .catch(err => console.error(err));

  // Handle tab switching
  studentTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const student = tab.dataset.student;
      loadVideos(student);
    });
  });

  function loadVideos(student) {
    const videos = window.videoData[student] || [];

    videoContainer.innerHTML = videos.map(v => `
      <div class="video-card">
        <h3>${v.title}</h3>
        <video controls src="${v.url}"></video>
        <p>${v.description}</p>
        <p class="class-label">${v.class}</p>
      </div>
    `).join("");
  }
});

document.addEventListener("DOMContentLoaded", function () {
    const homeBtn = document.getElementById("homeBtn");

    if (homeBtn) {
        homeBtn.addEventListener("click", function () {
            window.location.href = "home.html";
        });
    }
});
