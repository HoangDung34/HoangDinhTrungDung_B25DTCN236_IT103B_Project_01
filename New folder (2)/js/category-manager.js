const overlay = document.getElementById("overlay");

const addModal = document.getElementById("modal-add");
const editModal = document.getElementById("modal-edit");
const deleteModal = document.getElementById("modal-delete");

const openBtn = document.querySelector(".btn");

const allButtons = document.querySelectorAll("table button");

openBtn.onclick = () => {
    addModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

allButtons.forEach(btn => {
    if (btn.textContent.includes("✏️")) {
        btn.onclick = () => {
            editModal.classList.remove("hidden");
            overlay.classList.remove("hidden");
        };
    }

    if (btn.textContent.includes("🗑️")) {
        btn.onclick = () => {
            deleteModal.classList.remove("hidden");
            overlay.classList.remove("hidden");
        };
    }
});

function closeAll() {
    addModal.classList.add("hidden");
    editModal.classList.add("hidden");
    deleteModal.classList.add("hidden");
    overlay.classList.add("hidden");
}

document.querySelector(".close").onclick = closeAll;
document.querySelector(".btn-cancel").onclick = closeAll;

document.querySelector(".close-edit").onclick = closeAll;
document.querySelector(".btn-cancel-edit").onclick = closeAll;

document.querySelector(".close-delete").onclick = closeAll;
document.querySelector(".btn-cancel-delete").onclick = closeAll;

overlay.onclick = closeAll;