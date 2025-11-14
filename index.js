document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("loginBtn");

    if (loginBtn) {
        loginBtn.addEventListener("click", function () {
            window.location.href = "dashboard.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const createLink = document.getElementById("createLink");

    if (createLink) {
        createLink.addEventListener("click", function () {
            window.location.href = "create.html";        });
    }
});
