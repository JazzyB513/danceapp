
document.addEventListener("DOMContentLoaded", () => {
    loadVideos();
});

let allVideos = [];

/* --------------------------------------------------------
   Load Videos from JSON
--------------------------------------------------------- */
async function loadVideos() {
    try {
        const response = await fetch("videos.json");
        allVideos = await response.json();

        // Sort videos by newest first
        allVideos.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        buildSidebar(allVideos);
        renderVideos(allVideos);
    } catch (err) {
        console.error("Error loading videos.json:", err);
    }
}

/* --------------------------------------------------------
   Build Dynamic Sidebar (Class list)
--------------------------------------------------------- */
function buildSidebar(videos) {
    const classList = document.getElementById("class-list");
    classList.innerHTML = "";

    // "All" always first
    const allItem = document.createElement("li");
    allItem.textContent = "All Videos";
    allItem.classList.add("filter-item");
    allItem.addEventListener("click", () => {
        document.getElementById("video-title").textContent = "All Videos";
        renderVideos(allVideos);
    });
    classList.appendChild(allItem);

    // get unique class names
    const classes = [...new Set(videos.map(v => v.class))];

    classes.forEach(cls => {
        const item = document.createElement("li");
        item.textContent = cls;
        item.classList.add("filter-item");

        item.addEventListener("click", () => {
            document.getElementById("video-title").textContent = cls;
            const filtered = allVideos.filter(v => v.class === cls);
            renderVideos(filtered);
        });

        classList.appendChild(item);
    });
}

/* --------------------------------------------------------
   Display Videos in the Gallery
--------------------------------------------------------- */
function renderVideos(videos) {
    const gallery = document.getElementById("video-gallery");
    gallery.innerHTML = "";

    videos.forEach(video => {
        const div = document.createElement("div");
        div.classList.add("video-card");

        div.innerHTML = `
            <video src="${video.src}" controls></video>
            <h3>${video.title}</h3>
            <p><strong>Class:</strong> ${video.class}</p>
            <p><strong>Student:</strong> ${video.student}</p>
            <p><strong>Date:</strong> ${video.timestamp}</p>
        `;

        gallery.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const homeBtn = document.getElementById("homeBtn");

    if (homeBtn) {
        homeBtn.addEventListener("click", function () {
            window.location.href = "home.html";
        });
    }
});
