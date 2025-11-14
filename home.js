document.addEventListener("DOMContentLoaded", function () {
    const videoBtn = document.getElementById("videoBtn");

    if (videoBtn) {
        videoBtn.addEventListener("click", function () {
            window.location.href = "video.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const payBtn = document.getElementById("payBtn");

    if (payBtn) {
        payBtn.addEventListener("click", function () {
            window.location.href = "payment.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const scheduleBtn = document.getElementById("scheduleBtn");

    if (scheduleBtn) {
        scheduleBtn.addEventListener("click", function () {
            window.location.href = "schedule.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const memoryBtn = document.getElementById("memoryBtn");

    if (memoryBtn) {
        memoryBtn.addEventListener("click", function () {
            window.location.href = "memories.html";
        });
    }
});
