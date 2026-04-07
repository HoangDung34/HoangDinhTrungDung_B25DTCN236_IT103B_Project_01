const avatarElement = document.getElementById("avatar");
const logoutMenuElement = document.getElementById("logoutMenu");
const logoutBtnElement = document.getElementById("logoutBtn");

const modalLogoutElement = document.querySelector(".modal-logout");
const closeLogoutElement = document.querySelector(".close-logout");
const cancelLogoutElement = document.querySelector(".logout-cancel");
const confirmLogoutElement = document.querySelector(".logout-confirm");

avatarElement.addEventListener("click", (e) => {
    e.stopPropagation();
    logoutMenuElement.style.display =
        logoutMenuElement.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", () => {
    logoutMenuElement.style.display = "none";
});

logoutBtnElement.addEventListener("click", () => {
    modalLogoutElement.style.display = "block";
    logoutMenuElement.style.display = "none";
});

const closeLogoutModal = () => {
    modalLogoutElement.style.display = "none";
};

closeLogoutElement.addEventListener("click", closeLogoutModal);
cancelLogoutElement.addEventListener("click", closeLogoutModal);

confirmLogoutElement.addEventListener("click", () => {
    window.location.href = "./register.html";
});

const tableTbodyElement = document.getElementById("tbody");

const modalAddElement = document.getElementById("modal-add");
const modalCloseIcon = document.getElementById("closeIcon");
const modalCloseCancel = document.getElementById("closeCancel");
const btnAddSubjectElemeent = document.getElementById("btnAdd");

const nameSubjectInputElement = document.getElementById("nameSubject");
const numberInputElement = document.getElementById("numberSubject");

const errNameSubjectElement = document.getElementById("error-name");
const errNumberSubjectElement = document.getElementById("error-number");

const filterStatusElement = document.getElementById("filter-status");

const modalDeleteElement = document.getElementById("modal-delete");
const btnDeleteElement = document.getElementById("btnDelete");
const btnDeleteCancelElement = document.getElementById("closeCancelDelete");

const modalEditElement = document.getElementById("modal-edit");
const modalIconEdit = document.getElementById("iconEdit");
const editNameInputElement = document.getElementById("edit-name");
const btnEditCancelElement = document.getElementById("btnCancelEdit");
const btnEditSaveElement = document.getElementById("btnSave");
const errnameEditElement = document.getElementById("error-name-edit");

const statusEditRadios = document.getElementsByName("status-edit");

const subjectTextElement = document.getElementById("subjectText");

const buttonNumberElement = document.getElementById("button-number");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

let lessons = JSON.parse(localStorage.getItem("lessons")) || [];
let filteredLessons = lessons.slice();

let currentPage = 1;
const pageSize = 5;

let idDelete = null;
let idEdit = null;

const renderLesson = (data) => {
    let html = "";

    let sortedData = data.slice();
    sortedData.sort((a, b) => a.name.localeCompare(b.name));

    const totalPages = Math.ceil(sortedData.length / pageSize);
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    const paginatedData = sortedData.slice(start, end);

    paginatedData.forEach((item) => {
        let statusClass = item.status === "active" ? "st-active-status" : "st-inactive-status";
        let statusText = item.status === "active" ? "Đang hoạt động" : "Ngừng hoạt động";

        html += `
        <tr>
            <td><input type="checkbox"></td>
            <td>${item.name}</td>
            <td>${item.time}</td>
            <td><span class="st-status ${statusClass}">● ${statusText}</span></td>
            <td>
                <button class="btn-icon" onclick="handleDelete(${item.id})"><img src="../assets/icons/Button.png" alt=""></button>
                <button class="btn-icon" onclick="handleEdit(${item.id})"><img src="../assets/icons/Button (1).png" alt=""></button>
            </td>
        </tr>
        `;
    });

    tableTbodyElement.innerHTML = html;
    renderPagination(totalPages);
};

const renderPagination = (totalPages) => {
    let html = "";

    for (let i = 1; i <= totalPages; i++) {
        html += `<button onclick="changePage(${i})" class="${i === currentPage ? 'active' : ''}">${i}</button>`;
    }

    buttonNumberElement.innerHTML = html;

    btnPrev.disabled = currentPage === 1;
    btnNext.disabled = currentPage === totalPages || totalPages === 0;
};

const changePage = (page) => {
    const totalPages = Math.ceil(filteredLessons.length / pageSize);
    if (page < 1 || page > totalPages) return;

    currentPage = page;
    renderLesson(filteredLessons);
};

btnPrev.addEventListener("click", () => {
    changePage(currentPage - 1);
});

btnNext.addEventListener("click", () => {
    changePage(currentPage + 1);
});

filteredLessons = lessons.slice();
renderLesson(filteredLessons);

const handleCloseModalAdd = () => {
    modalAddElement.style.display = "none";
};

btnAddSubjectElemeent.addEventListener("click", () => {
    modalAddElement.style.display = "block";
});

modalCloseIcon.addEventListener("click", handleCloseModalAdd);
modalCloseCancel.addEventListener("click", handleCloseModalAdd);

btnAddLesson.addEventListener("click", () => {
    let name = nameSubjectInputElement.value.trim();
    let timeValue = numberInputElement.value;
    let time = Number(timeValue);

    let status = document.querySelector("input[name='status-add']:checked").value;

    let isValid = true;

    let nameExist = lessons.find(item => item.name.toLowerCase() === name.toLowerCase());

    if (!name) {
        errNameSubjectElement.textContent = "Không được để trống";
        isValid = false;
    } else if (nameExist) {
        errNameSubjectElement.textContent = "Tên bị trùng";
        isValid = false;
    } else {
        errNameSubjectElement.textContent = "";
    }

    if (timeValue === "") {
        errNumberSubjectElement.textContent = "Không được để trống";
        isValid = false;
    } else if (time <= 0) {
        errNumberSubjectElement.textContent = "Phải > 0";
        isValid = false;
    } else {
        errNumberSubjectElement.textContent = "";
    }

    if (!isValid) return;

    let newLesson = {
        id: Date.now(),
        name: name,
        time: time,
        status: status
    };

    lessons.push(newLesson);
    localStorage.setItem("lessons", JSON.stringify(lessons));

    filteredLessons = lessons.slice();
    currentPage = 1;
    renderLesson(filteredLessons);

    handleCloseModalAdd();

    Swal.fire({
        title: "Thêm thành công",
        icon: "success"
    });

    nameSubjectInputElement.value = "";
    numberInputElement.value = "";
});

const filterStatusLesson = () => {
    let value = filterStatusElement.value;

    if (value === "all") {
        filteredLessons = lessons.slice();
    } else {
        filteredLessons = lessons.filter(item => item.status === value);
    }

    currentPage = 1;
    renderLesson(filteredLessons);
};

filterStatusElement.addEventListener("change", filterStatusLesson);

const handleDelete = (id) => {
    idDelete = id;

    let lesson = lessons.find(item => item.id === id);
    subjectTextElement.textContent = lesson ? lesson.name : "";

    modalDeleteElement.style.display = "block";
};

btnDeleteCancelElement.addEventListener("click", () => {
    modalDeleteElement.style.display = "none";
});

btnDeleteElement.addEventListener("click", () => {
    lessons = lessons.filter(item => item.id !== idDelete);

    localStorage.setItem("lessons", JSON.stringify(lessons));

    filteredLessons = lessons.slice();
    currentPage = 1;
    renderLesson(filteredLessons);

    modalDeleteElement.style.display = "none";

    Swal.fire({
        title: "Xóa thành công",
        icon: "success"
    });
});

const handleEdit = (id) => {
    idEdit = id;

    let lesson = lessons.find(item => item.id === id);

    editNameInputElement.value = lesson.name;

    statusEditRadios.forEach(radio => {
        radio.checked = (radio.value === lesson.status);
    });

    modalEditElement.style.display = "block";
};

btnEditCancelElement.addEventListener("click", () => {
    modalEditElement.style.display = "none";
});

modalIconEdit.addEventListener("click", () => {
    modalEditElement.style.display = "none";
});

btnEditSaveElement.addEventListener("click", () => {
    let newName = editNameInputElement.value.trim();
    let isValid = true;

    let nameExist = lessons.find(item =>
        item.id !== idEdit &&
        item.name.toLowerCase() === newName.toLowerCase()
    );

    if (!newName) {
        errnameEditElement.textContent = "Không được để trống";
        isValid = false;
    } else if (nameExist) {
        errnameEditElement.textContent = "Tên bị trùng";
        isValid = false;
    } else {
        errnameEditElement.textContent = "";
    }

    if (!isValid) return;

    let newStatus = "";
    statusEditRadios.forEach(radio => {
        if (radio.checked) newStatus = radio.value;
    });

    for (let i = 0; i < lessons.length; i++) {
        if (lessons[i].id === idEdit) {
            lessons[i].name = newName;
            lessons[i].status = newStatus;
            break;
        }
    }

    localStorage.setItem("lessons", JSON.stringify(lessons));

    filteredLessons = lessons.slice();
    renderLesson(filteredLessons);

    modalEditElement.style.display = "none";

    Swal.fire({
        title: "Cập nhật thành công",
        icon: "success"
    });
});