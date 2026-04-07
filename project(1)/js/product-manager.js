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

//lấy element
const nameSubjectInputElement = document.getElementById("nameSubject");
const numberInputElement = document.getElementById("numberSubject");

//lấy nút click
const btnAddSubjectElement = document.getElementById("btnAdd");
const modalAddElement = document.getElementById("modal-add");
const modalCloseIcon = document.getElementById("closeIcon");
const modalCloseCancel = document.getElementById("closeCancel");
const btnAddInputSubjectElement = document.getElementById("btnAddLesson");

//lấy thông báo lỗi
const errNameSubjectElement = document.getElementById("error-name");
const errNumberSubjectElement = document.getElementById("error-number");

let lessons = JSON.parse(localStorage.getItem("lessons")) || [];


//hiển thị
const renderLesson = () => {

}

//Thêm tiết học

//hàm đóng modal
const handleCloseModalAdd = () => {
    modalAddElement.style.display = "none"
}

//đóng modal bằng "x"
modalCloseIcon.addEventListener('click', () => {
    handleCloseModalAdd();
})

//đóng modal bằng "hủy"
modalCloseCancel.addEventListener('click', () => {
    handleCloseModalAdd();
})

//thêm tiết học
btnAddInputSubjectElement.addEventListener('click', () => {
    let name = nameSubjectInputElement.value;
    let time = numberInputElement.value;

    let isValid = true;

    let nameExist = lessons.find(value => value.name === name);

    if(!name){
        errNameSubjectElement.textContent = "Tên môn học không được để trống";
        isValid = false;
    }else{
        if(nameExist){
            errNameSubjectElement.textContent = "Tên không được trùng nhau";
            isValid = false;
        }else{
            errNameSubjectElement.textContent = "";
        }
    }

    if(!time){
        errNumberSubjectElement.textContent = "Thời gian học không được để trống";
        isValid = false;
    }else{
        if(time < 0){
            errNumberSubjectElement.textContent = "Thời gian học phải lớn hơn 0";
            isValid = false;
        }else{
            errNumberSubjectElement.textContent = "";
        }
    }

    if(isValid){
        let lesson = {
            id: Math.ceil(Math.random()),
            name: name,
            time: time,
        }

        lessons.push(lesson);
        localStorage.setItem("lessons", JSON.stringify(lessons));
        renderLesson();
    }
})

//mở modal thêm
btnAddSubjectElement.addEventListener('click', () => {
    modalAddElement.style.display = "block";
})


