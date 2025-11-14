document.addEventListener("DOMContentLoaded", () => {
    loadVideos();
});

/* --------------------------------------------------------
   1. Load videos.json
--------------------------------------------------------- */
async function loadVideos() {
    try {
        const response = await fetch("videos.json");
        const videos = await response.json();

        renderFilters(videos);
        renderVideos(videos);
    } catch (error) {
        console.error("Error loading videos.json:", error);
    }
}

/* --------------------------------------------------------
   2. Render filter buttons (generated from student names)
--------------------------------------------------------- */
function renderFilters(videos) {
    const filterContainer = document.getElementById("video-filters");
    filterContainer.innerHTML = ""; // clear existing

    const students = ["All", ...new Set(videos.map(v => v.student))];

    students.forEach(student => {
        const button = document.createElement("button");
        button.classList.add("filter-btn");
        button.textContent = student;

        button.addEventListener("click", () => {
            filterByStudent(student, videos);
        });

        filterContainer.appendChild(button);
    });
}

/* --------------------------------------------------------
   3. Display all videos
--------------------------------------------------------- */
function renderVideos(videos) {
    const gallery = document.getElementById("video-gallery");
    gallery.innerHTML = ""; // clear any old videos

    videos.forEach(video => {
        const item = document.createElement("div");
        item.classList.add("video-item");
        item.dataset.student = video.student;

        item.innerHTML = `
            <div class="video-card">
                <video src="${video.src}" controls></video>
                <h3>${video.title}</h3>
                <p><strong>Student:</strong> ${video.student}</p>
                <p><strong>Level:</strong> ${video.level}</p>
                <p><strong>Category:</strong> ${video.category}</p>
            </div>
        `;

        gallery.appendChild(item);
    });
}

/* --------------------------------------------------------
   4. Filter videos by student
--------------------------------------------------------- */
function filterByStudent(student, allVideos) {
    if (student === "All") {
        renderVideos(allVideos);
        return;
    }

    const filtered = allVideos.filter(v => v.student === student);
    renderVideos(filtered);
}

document.addEventListener("DOMContentLoaded", function () {
    const homeBtn = document.getElementById("homeBtn");

    if (homeBtn) {
        homeBtn.addEventListener("click", function () {
            window.location.href = "home.html";
        });
    }
});
