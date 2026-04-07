const avatar = document.getElementById("avatar");
const menu = document.getElementById("logoutMenu");

avatar.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !avatar.contains(e.target)) {
        menu.classList.add("hidden");
    }
});

document.getElementById("logoutBtn").addEventListener("click", () => {
            window.location.href = "register.html"
});
