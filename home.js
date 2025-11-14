document.addEventListener("DOMContentLoaded", function () {
    const videoBtn = document.getElementById("videoBtn");

    if (videoBtn) {
        videoBtn.addEventListener("click", function () {
            window.location.href = "video.html";
        });
    }
});
