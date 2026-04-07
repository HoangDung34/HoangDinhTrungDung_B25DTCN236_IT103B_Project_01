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

const nameSubjectInput = document.getElementById("nameSubject");
const btnAddInputElement = document.getElementById("btn-add-subject");
const modalAddElement = document.getElementById("modal-add");
const modalCloseIcon = document.getElementById("closeIcon");
const modalCloseCancel = document.getElementById("closeCancel");
const btnAddSubjectElemeent = document.getElementById("btnAdd");

const tableBodyElement = document.getElementById("table-body");
const searchInputElement = document.getElementById("search-input");
const filterStatusElement = document.getElementById("filter-status");

const modalDeleteElement = document.getElementById("modal-delete");
const btnDeleteElement = document.getElementById("btnDelete");
const btnDeleteCancelElement = document.getElementById("closeCancelDelete");

const modalEditElement = document.getElementById("modal-edit");
const modalIconEdit = document.getElementById("iconEdit");
const editNameInputElement = document.getElementById("edit-name");
const btnEditCancelElement = document.getElementById("btnCancelEdit");
const btnEditSaveElement = document.getElementById("btnSave");
const statusEditRadios = document.getElementsByName("status-edit");
const subjectTextElement = document.getElementById("subjectText");

const errNameInputElement = document.getElementById("error-name");
const errnameEditElement = document.getElementById("error-name-edit");

let lists = JSON.parse(localStorage.getItem("lists")) || [];

// pagination
let currentPage = 1;
const pageSize = 5;

let filteredLists = lists.slice();

const paginationContainer = document.getElementById("button-number");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

const renderListSubject = (data) => {
    let html = "";

    let sortedData = data.slice();
    sortedData.sort((a, b) => a.name.localeCompare(b.name));

    const totalPages = Math.ceil(sortedData.length / pageSize);

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    const paginatedData = sortedData.slice(start, end);

    paginatedData.forEach((element) => {
        let statusClass = element.status === "active" ? "st-active-status" : "st-inactive-status";
        let statusText = element.status === "active" ? "Đang hoạt động" : "Ngừng hoạt động";

        html += `
            <tr>
                <td>${element.name}</td>
                <td><span class="st-status ${statusClass}">● ${statusText}</span></td>
                <td>
                    <span onclick="handleDeleteSubject(${element.id})"><img src="../assets/icons/Button.png" alt=""></span>
                    <span onclick="handleEditSubject(${element.id})"><img src="../assets/icons/Button (1).png" alt=""></span>
                </td>
            </tr>
        `;
    });

    tableBodyElement.innerHTML = html;

    renderPagination(totalPages);
};

const renderPagination = (totalPages) => {
    let html = "";

    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="page-btn ${i === currentPage ? "active" : ""}" onclick="changePage(${i})">${i}</button>`;
    }

    paginationContainer.innerHTML = html;

    btnPrev.disabled = currentPage === 1;
    btnNext.disabled = currentPage === totalPages || totalPages === 0;
};

const changePage = (page) => {
    const totalPages = Math.ceil(filteredLists.length / pageSize);

    if (page < 1 || page > totalPages) return;

    currentPage = page;
    renderListSubject(filteredLists);
};

btnPrev.addEventListener("click", () => {
    changePage(currentPage - 1);
});

btnNext.addEventListener("click", () => {
    changePage(currentPage + 1);
});

btnAddInputElement.addEventListener("click", () => {
    modalAddElement.style.display = "block";
});

modalCloseIcon.addEventListener("click", () => modalAddElement.style.display = "none");
modalCloseCancel.addEventListener("click", () => modalAddElement.style.display = "none");

btnAddSubjectElemeent.addEventListener("click", () => {
    let name = nameSubjectInput.value.trim();
    let isValid = true;

    let nameExist = lists.find(
        value => value.name.trim().toLowerCase() === name.toLowerCase()
    );

    if (!name) {
        errNameInputElement.textContent = "Tên không được để trống";
        isValid = false;
    } else if (nameExist) {
        errNameInputElement.textContent = "Tên không được trùng";
        isValid = false;
    } else {
        errNameInputElement.textContent = "";
    }

    if (!isValid) return;

    let status = document.querySelector("input[name='status-add']:checked").value;

    let newList = {
        id: Math.ceil(Math.random() * 9999999),
        name: name,
        status: status,
    };

    lists.push(newList);
    localStorage.setItem("lists", JSON.stringify(lists));

    Swal.fire({
        title: "thêm thành công",
        icon: "success",
        draggable: true,
        confirmButtonText: "OK"
    })

    filteredLists = lists.slice();
    currentPage = 1;

    renderListSubject(filteredLists);

    nameSubjectInput.value = "";
    document.querySelector("input[value='active']").checked = true;
    modalAddElement.style.display = "none";
});

const handleFindSubject = () => {
    let keyword = searchInputElement.value.toLowerCase();

    if (!keyword) {
        filteredLists = lists.slice();
    } else {
        filteredLists = lists.filter(item =>
            item.name.toLowerCase().includes(keyword)
        );
    }

    currentPage = 1;
    renderListSubject(filteredLists);
};

searchInputElement.addEventListener("input", handleFindSubject);

const filterStatusSubject = () => {
    let value = filterStatusElement.value;

    if (value === "all") {
        filteredLists = lists.slice();
    } else {
        filteredLists = lists.filter(item => item.status === value);
    }

    currentPage = 1;
    renderListSubject(filteredLists);
};

filterStatusElement.addEventListener("change", filterStatusSubject);

let idDelete = null;

const handleDeleteSubject = (id) => {
    idDelete = id;
    const subject = lists.find(item => item.id === id);
    modalDeleteElement.style.display = "block";
    subjectTextElement.textContent = subject ? subject.name : "";
};

btnDeleteCancelElement.addEventListener("click", () => {
    modalDeleteElement.style.display = "none";
});

btnDeleteElement.addEventListener("click", () => {
    lists = lists.filter(item => item.id !== idDelete);

    localStorage.setItem("lists", JSON.stringify(lists));

    filteredLists = lists.slice();
    currentPage = 1;

    renderListSubject(filteredLists);

    modalDeleteElement.style.display = "none";

    Swal.fire({
        title: "xóa thành công",
        icon: "success",
        draggable: true,
        confirmButtonText: "OK"
    })
});

let idEdit = null;

const handleEditSubject = (id) => {
    idEdit = id;

    let subject = lists.find(item => item.id === id);
    if (!subject) return;

    editNameInputElement.value = subject.name;

    statusEditRadios.forEach(radio => {
        radio.checked = radio.value === subject.status;
    });

    modalEditElement.style.display = "block";
};

modalIconEdit.addEventListener("click", () => modalEditElement.style.display = "none");
btnEditCancelElement.addEventListener("click", () => modalEditElement.style.display = "none");

btnEditSaveElement.addEventListener("click", () => {
    let newName = editNameInputElement.value.trim();

    let nameExist = lists.find(value =>
        value.id !== idEdit && value.name.trim().toLowerCase() === newName.toLowerCase()
    );

    if (!newName) {
        errnameEditElement.textContent = "Tên không được để trống";
        return;
    }

    if (nameExist) {
        errnameEditElement.textContent = "Tên không được trùng";
        return;
    } else {
        errnameEditElement.textContent = "";
    }

    let newStatus = "";
    statusEditRadios.forEach(radio => {
        if (radio.checked) newStatus = radio.value;
    });

    for (let i = 0; i < lists.length; i++) {
        if (lists[i].id === idEdit) {
            lists[i].name = newName;
            lists[i].status = newStatus;
            break;
        }
    }

    localStorage.setItem("lists", JSON.stringify(lists));

    filteredLists = lists.slice();
    renderListSubject(filteredLists);

    modalEditElement.style.display = "none";

    Swal.fire({
        title: "sửa thành công",
        icon: "success",
        draggable: true,
        confirmButtonText: "OK"
    })
});

renderListSubject(filteredLists);