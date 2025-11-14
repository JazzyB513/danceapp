document.addEventListener("DOMContentLoaded", () => {
    const eventTabs = document.getElementById("eventTabs");
    const mediaGrid = document.getElementById("mediaGrid");
    const eventTitle = document.getElementById("eventTitle");

    let allMedia = [];

    // Load JSON
    fetch("memories.json")
        .then(res => res.json())
        .then(data => {
            allMedia = data.media;
            populateEventTabs();
            displayMedia("All Memories");
        });

    // Populate event tabs dynamically
    function populateEventTabs() {
        const events = ["All Memories", ...new Set(allMedia.map(m => m.event))];
        events.forEach((event, idx) => {
            const li = document.createElement("li");
            li.textContent = event;
            if(idx === 0) li.classList.add("active");
            li.addEventListener("click", () => {
                document.querySelector("#eventTabs .active").classList.remove("active");
                li.classList.add("active");
                displayMedia(event);
            });
            eventTabs.appendChild(li);
        });
    }

    // Display media items
    function displayMedia(eventName) {
        mediaGrid.innerHTML = "";
        eventTitle.textContent = eventName;

        const filteredMedia = eventName === "All Memories"
            ? allMedia
            : allMedia.filter(m => m.event === eventName);

        filteredMedia.forEach(media => {
            const card = document.createElement("div");
            card.classList.add("video-card");

            if(media.type === "photo") {
                card.innerHTML = `<img src="${media.url}" alt="${media.title}">`;
            } else if(media.type === "video") {
                card.innerHTML = `<video src="${media.url}" muted></video>`;
            }

            // Click opens modal
            card.addEventListener("click", () => openModal(media));
            mediaGrid.appendChild(card);
        });
    }

    // Modal
    const modal = document.getElementById("mediaModal");
    const closeBtn = modal.querySelector(".close-btn");
    const modalTitle = document.getElementById("modalTitle");
    const modalDate = document.getElementById("modalDate");
    const modalDescription = document.getElementById("modalDescription");
    const modalMedia = document.getElementById("modalMedia");
    const downloadBtn = document.getElementById("downloadBtn");

    function openModal(media) {
        modalTitle.textContent = media.title;
        modalDate.textContent = media.date;
        modalDescription.textContent = media.description;

        modalMedia.innerHTML = "";
        if(media.type === "photo") {
            const img = document.createElement("img");
            img.src = media.url;
            img.style.width = "100%";
            modalMedia.appendChild(img);
        } else if(media.type === "video") {
            const vid = document.createElement("video");
            vid.src = media.url;
            vid.controls = true;
            vid.style.width = "100%";
            modalMedia.appendChild(vid);
        }

        downloadBtn.href = media.url;
        downloadBtn.download = media.url.split("/").pop();

        modal.style.display = "block";
    }

    closeBtn.addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", e => { if(e.target === modal) modal.style.display = "none"; });
});

document.addEventListener("DOMContentLoaded", function () {
    const homeBtn = document.getElementById("homeBtn");

    if (homeBtn) {
        homeBtn.addEventListener("click", function () {
            window.location.href = "home.html";
        });
    }
});
