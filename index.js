document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("loginBtn");

    if (loginBtn) {
        loginBtn.addEventListener("click", function () {
            window.location.href = "home.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const createBtn = document.getElementById("createBtn");

    if (createBtn) {
        createBtn.addEventListener("click", function () {
            window.location.href = "create.html";        });
    }
});
