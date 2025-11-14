/* Example data — replace later with database data */
const videoData = {
  "Ballet I": [
    { title: "Warmup Combo", file: "videos/ballet1/warmup.mp4" },
    { title: "Across the Floor", file: "videos/ballet1/across.mp4" },
    { title: "Choreography", file: "videos/ballet1/choreo.mp4" }
  ],
  "Jazz II": [
    { title: "Technique Drills", file: "videos/jazz2/drills.mp4" },
    { title: "Combo Part 1", file: "videos/jazz2/combo1.mp4" }
  ],
  "Hip Hop": [
    { title: "Isolations", file: "videos/hiphop/isolation.mp4" },
    { title: "Footwork", file: "videos/hiphop/footwork.mp4" }
  ]
};

/* Sidebar List */
const classList = document.getElementById("classList");
const classTitle = document.getElementById("classTitle");
const videoGrid = document.getElementById("videoGrid");

/* Populate Class List */
Object.keys(videoData).forEach(className => {
  const li = document.createElement("li");
  li.textContent = className;

  li.addEventListener("click", () => {
    document.querySelectorAll(".sidebar li").forEach(el => el.classList.remove("active"));
    li.classList.add("active");

    loadVideos(className);
  });

  classList.appendChild(li);
});

/* Load Videos for Selected Class */
function loadVideos(className) {
  classTitle.textContent = className;
  videoGrid.innerHTML = ""; // clear old videos

  videoData[className].forEach(video => {
    const card = document.createElement("div");
    card.className = "video-card";

    card.innerHTML = `
      <video src="${video.file}" controls></video>
      <div class="video-info">
        <h3>${video.title}</h3>
        <p>${className}</p>
      </div>
    `;

    videoGrid.appendChild(card);
  });
}
