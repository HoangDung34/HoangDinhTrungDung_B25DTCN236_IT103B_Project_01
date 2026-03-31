const overlay = document.getElementById("overlay");

const addModal = document.getElementById("modal-add");
const editModal = document.getElementById("modal-edit");
const deleteModal = document.getElementById("modal-delete");

const openBtn = document.querySelector(".btn");
const closeBtn = document.querySelector(".close");
const cancelBtn = document.querySelector(".btn-cancel");

const closeEdit = document.querySelector(".close-edit");
const cancelEdit = document.querySelector(".btn-cancel-edit");

const closeDelete = document.querySelector(".close-delete");
const cancelDelete = document.querySelector(".btn-cancel-delete");

const allButtons = document.querySelectorAll("table button");

function openModal(modal) {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

function closeAll() {
    addModal.classList.add("hidden");
    editModal.classList.add("hidden");
    deleteModal.classList.add("hidden");
    overlay.classList.add("hidden");
}

openBtn.onclick = () => openModal(addModal);
closeBtn.onclick = closeAll;
cancelBtn.onclick = closeAll;

allButtons.forEach(btn => {
    if (btn.textContent.includes("✏️")) {
        btn.onclick = () => openModal(editModal);
    }
});

allButtons.forEach(btn => {
    if (btn.textContent.includes("🗑️")) {
        btn.onclick = () => openModal(deleteModal);
    }
});

closeEdit.onclick = closeAll;
cancelEdit.onclick = closeAll;

closeDelete.onclick = closeAll;
cancelDelete.onclick = closeAll;

overlay.onclick = closeAll;

















































































// const overlay = document.getElementById("overlay");

// const addModal = document.getElementById("modal-add");
// const openBtn = document.querySelector(".btn");
// const closeBtn = document.querySelector(".close");
// const cancelBtn = document.querySelector(".btn-cancel");

// const editModal = document.getElementById("modal-edit");
// const closeEdit = document.querySelector(".close-edit");
// const cancelEdit = document.querySelector(".btn-cancel-edit");

// const deleteModal = document.getElementById("modal-delete");
// const closeDelete = document.querySelector(".close-delete");
// const cancelDelete = document.querySelector(".btn-cancel-delete");

// const allButtons = document.querySelectorAll("table button");

// let currentRow = null;

// function openModal(modal) {
//     modal.classList.remove("hidden");
//     overlay.classList.remove("hidden");
// }

// function closeAll() {
//     addModal.classList.add("hidden");
//     editModal.classList.add("hidden");
//     deleteModal.classList.add("hidden");
//     overlay.classList.add("hidden");
// }

// openBtn.onclick = () => openModal(addModal);
// closeBtn.onclick = closeAll;
// cancelBtn.onclick = closeAll;

// allButtons.forEach(btn => {
//     if (btn.textContent.includes("✏️")) {
//         btn.onclick = function () {
//             currentRow = btn.closest("tr");

//             const name = currentRow.children[1].innerText;
//             const time = currentRow.children[2].innerText;

//             document.getElementById("edit-name").value = name;
//             document.getElementById("edit-time").value = time;

//             openModal(editModal);
//         }
//     }
// });

// document.querySelector("#modal-edit .btn-submit").onclick = function () {
//     if (!currentRow) return;

//     const newName = document.getElementById("edit-name").value;
//     const newTime = document.getElementById("edit-time").value;

//     currentRow.children[1].innerText = newName;
//     currentRow.children[2].innerText = newTime;

//     closeAll();
// };

// allButtons.forEach(btn => {
//     if (btn.textContent.includes("🗑️")) {
//         btn.onclick = function () {
//             currentRow = btn.closest("tr");
//             openModal(deleteModal);
//         }
//     }
// });

// document.querySelector(".btn-delete").onclick = function () {
//     if (currentRow) {
//         currentRow.remove();
//     }
//     closeAll();
// };

// closeEdit.onclick = closeAll;
// cancelEdit.onclick = closeAll;

// closeDelete.onclick = closeAll;
// cancelDelete.onclick = closeAll;

// overlay.onclick = closeAll;