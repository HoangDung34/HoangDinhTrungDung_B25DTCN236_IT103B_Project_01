const nameInputElement = document.getElementById("name");
const mainNameInputElement = document.getElementById("main-name");
const emailInputElement = document.getElementById("email");
const passWordInputElement = document.getElementById("password");
const confirmPasswordElement = document.getElementById("confirm-password")
const btnLogElement = document.getElementById("btn-log");
const checkboxElement = document.getElementById("checkbox");

const errNameElement = document.getElementById("errName");
const errNameMainElement = document.getElementById("errMainName");
const errEmailElement = document.getElementById("errEmail");
const errPassWordElement = document.getElementById("errPassWord");
const errConfirmPasswordElement = document.getElementById("errConfirmPassword");
const errCheckboxElement = document.getElementById("errCheckbox");

//kiểm tra tích điều khoản dùng checked input

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
};

let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

btnLogElement.addEventListener("click", () => {
    let isValid = true;
    const duplicateEmail = accounts.some(user => user.email === emailInputElement.value.trim());

    if (!nameInputElement.value) {
        errNameElement.textContent = "Tên đệm không được để trống";
        isValid = false;
    } else {
        errNameElement.textContent = ""
    }

    if (!mainNameInputElement.value) {
        errNameMainElement.textContent = "Tên không được để trống";
        isValid = false;
    } else {
        errNameMainElement.textContent = "";
    }

    if (!emailInputElement.value.trim()) {
        errEmailElement.textContent = "email không được để trống";
        isValid = false;
    } else {
        if (!validateEmail(emailInputElement.value.trim())) {
            errEmailElement.textContent = "email không đúng định dạng";
            isValid = false;
        } else if (duplicateEmail) {
            errEmailElement.textContent = "email đã tồn tại"
            isValid = false;
        } else {
            errEmailElement.textContent = "";
        }
    }

    if (!passWordInputElement.value.trim()) {
        errPassWordElement.textContent = "Mật khẩu không được để trống";
        isValid = false;
    } else {
        if (passWordInputElement.value.trim().length < 8) {
            errPassWordElement.textContent = "Mật khẩu tối thiểu 8 ký tự";
            isValid = false;
        } else {
            errPassWordElement.textContent = "";
        }
    }

    if (!checkboxElement.checked) {
        errCheckboxElement.textContent = "Bạn cần đồng ý với chính sách và điều khoản";
        isValid = false;
    } else {
        errCheckboxElement.textContent = "";
    }

    if (isValid) {
        let account = {
            id: Math.ceil(Math.random() * 99999999999),
            middleName: nameInputElement.value,
            name: mainNameInputElement.value,
            email: emailInputElement.value,
            pass: passWordInputElement.value,
            role: "user"
        }

        accounts.push(account);

        localStorage.setItem("accounts", JSON.stringify(accounts));

        nameInputElement.value = "";
        mainNameInputElement.value = "";
        emailInputElement.value = "";
        passWordInputElement.value = "";
        checkboxElement.checked = false;

        Swal.fire({
            title: "Đăng ký thành công",
            icon: "success",
            draggable: true,
            confirmButtonText: "OK"
        }).then(() => {
            window.location.href = "register.html"
        });
    }

});


