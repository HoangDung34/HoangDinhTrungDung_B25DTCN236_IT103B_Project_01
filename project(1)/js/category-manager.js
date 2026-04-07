// Element
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
    // Chuyển sang trang login
    window.location.href = "./register.html";
});

// lấy element
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

//lấy element báo lỗi
const errNameInputElement = document.getElementById("error-name");
const errnameEditElement = document.getElementById("error-name-edit");

//phân trang 
const buttonNumberElement = document.getElementById("button-number");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

let currentPage = 1;
const pageSize = 5;

let lists = JSON.parse(localStorage.getItem("lists")) || [];
let filteredLists = lists.slice();

let idDelete = null;
let idEdit = null;

//hiển thị danh sách
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
            <tr class="st-table-row">
                <td>${element.name}</td>
                <td><span class="st-status ${statusClass}">● ${statusText}</span></td>
                <td class="st-actions">
                    <span class="st-icon-del" onclick="handleDeleteSubject(${element.id})"><img src="../assets/icons/Button.png" alt=""></span>
                    <span class="st-icon-edit" onclick="handleEditSubject(${element.id})"><img src="../assets/icons/Button (1).png" alt=""></span>
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

    buttonNumberElement.innerHTML = html;

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

filteredLists = lists.slice();
renderListSubject(filteredLists);

//Modal thêm
//hàm đóng modal
const handleCloseModal = () => {
    modalAddElement.style.display = "none";
}
//mở modal
btnAddInputElement.addEventListener('click', () => {
    modalAddElement.style.display = "block";
})

//đóng modal bằng "x"
modalCloseIcon.addEventListener('click', () => {
    handleCloseModal();
})

//đóng modal bằng "hủy"
modalCloseCancel.addEventListener('click', () => {
    handleCloseModal();
})

//thêm môn học mới
btnAddSubjectElemeent.addEventListener('click', () => {
    //biến name lưu giá trị người dùng nhập vào ô input
    let name = nameSubjectInput.value.trim();
    let isValid = true;//cờ kiểm tra tính hợp lệ của dữ liệu
    let nameExist = lists.find(value => value.name.trim().toLowerCase() === name.trim().toLowerCase());//tìm xem tên tồn tại không

    //validate
    if (!name) {
        errNameInputElement.textContent = "tên môn học không được để trống";
        isValid = false;
    } else {
        if (nameExist) {
            errNameInputElement.textContent = "tên môn học không được trùng";
            isValid = false;
        } else {
            errNameInputElement.textContent = "";
        }
    }
    //kiểm tra dữ liệu đã thỏa mãn hết điều kiện chưa
    if (isValid) {
        //lấy trạng thái
        let status = document.querySelector("input[name='status-add']:checked").value;
        //tạo đối tượng mới
        let newList = {
            id: Math.ceil(Math.random() * 9999999),
            name: name,
            status: status,
        }
        //thêm vào mảng
        lists.push(newList);
        //lưu lên local
        localStorage.setItem("lists", JSON.stringify(lists));
        //render lại dữ liệu
        renderListSubject(lists);
        //reset input radio
        nameSubjectInput.value = "";
        document.querySelector("input[value='active']").checked = true;
        //đóng modal
        handleCloseModal();

        Swal.fire({
            title: "thêm thành công",
            icon: "success",
            draggable: true,
            confirmButtonText: "OK"
        })
    }

    filteredLists = lists.slice();
    currentPage = 1;
    renderListSubject(lists);
});

//tìm kiếm
const handleFindSubject = () => {
    let keyWord = searchInputElement.value.toLowerCase();

    if (!keyWord) {
        filteredLists = lists.slice();
    } else {
        filteredLists = lists.filter(item =>
            item.name.toLowerCase().includes(keyWord)
        );
    }

    currentPage = 1;
    renderListSubject(filteredLists);
};

searchInputElement.addEventListener('input', handleFindSubject);

//lọc theo trạng thái
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

filterStatusElement.addEventListener('change', filterStatusSubject);

//Xóa
//hàm đóng modal
const handleCloseModalDelete = () => {
    modalDeleteElement.style.display = "none";
}

btnDeleteCancelElement.addEventListener('click', () => {
    handleCloseModalDelete();
})

btnDeleteElement.addEventListener('click', () => {
    lists = lists.filter(item => item.id !== idDelete);

    localStorage.setItem("lists", JSON.stringify(lists));

    renderListSubject(lists);

    handleCloseModalDelete();

    Swal.fire({
        title: "xóa thành công",
        icon: "success",
        draggable: true,
        confirmButtonText: "OK"
    })

    filteredLists = lists.slice();
    currentPage = 1;
    renderListSubject(lists);
})

//hiện modal xác nhận xóa
const handleDeleteSubject = (id) => {
    idDelete = id;
    const subject = lists.find(item => item.id === id);
    modalDeleteElement.style.display = "block";
    subjectTextElement.textContent = subject ? subject.name : "";
}

//sửa
//hàm đóng modal
const editCloseModal = () => {
    modalEditElement.style.display = "none";
}

modalIconEdit.addEventListener('click', () => {
    editCloseModal();
})

btnEditCancelElement.addEventListener('click', () => {
    editCloseModal();
})

//cập nhật
btnEditSaveElement.addEventListener('click', () => {
    let newName = editNameInputElement.value.trim();
    let isValid = true;
    let nameExist = lists.find(value =>
        value.id !== idEdit && value.name.trim().toLowerCase() === newName.toLowerCase()
    );

    if (!newName) {
        alert("Tên môn học không được để trống");
        isValid = false;
    } else {
        if (nameExist) {
            errnameEditElement.textContent = "tên môn học không được trùng";
            isValid = false;
        } else {
            errnameEditElement.textContent = "";
        }
    }

    if (!isValid) return;

    // lấy status
    let newStatus = "";
    statusEditRadios.forEach(radio => {
        if (radio.checked) {
            newStatus = radio.value;
        }
    });

    // cập nhật
    for (let i = 0; i < lists.length; i++) {
        if (lists[i].id === idEdit) {
            lists[i].name = newName;
            lists[i].status = newStatus;
            break;
        }
    }

    // lưu localStorage
    localStorage.setItem("lists", JSON.stringify(lists));

    // render lại
    renderListSubject(lists);

    // đóng modal
    editCloseModal();

    Swal.fire({
        title: "cập nhật thành công",
        icon: "success",
        draggable: true,
        confirmButtonText: "OK"
    })

    filteredLists = lists.slice();
    renderListSubject(lists);
})

const handleEditSubject = (id) => {
    idEdit = id;

    let subject = lists.find(item => item.id === id);

    if (!subject) {
        return;
    }

    // fill tên
    editNameInputElement.value = subject.name;

    // fill trạng thái
    statusEditRadios.forEach(radio => {
        radio.checked = (radio.value === subject.status);
    });


    modalEditElement.style.display = "block";
}