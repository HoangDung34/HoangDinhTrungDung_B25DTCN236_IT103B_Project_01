const emailInputElement = document.getElementById("email");
const passWordInputElement = document.getElementById("password");
const checkboxElement = document.getElementById("checkbox");
const btnRegisElement = document.getElementById("btn-regis");

const errEmailElement = document.getElementById("errorEmail");
const errPassWordElement = document.getElementById("errorPassword");
const errCheckboxElement = document.getElementById("errorCheckbox");

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
};

btnRegisElement.addEventListener("click", (event) => {
    event.preventDefault();

    let isValidate = true;
    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    let adminExists = accounts.some(acc => acc.email === "admin@gmail.com");

    if (!adminExists) {
        accounts.push({
            id: 1,
            email: "admin@gmail.com",
            pass: "12345678",
            role: "admin"
        });

        localStorage.setItem("accounts", JSON.stringify(accounts));
    }

    if (!emailInputElement.value.trim()) {
        errEmailElement.textContent = "email không được để trống";
        isValidate = false;
    } else {
        if (!validateEmail(emailInputElement.value.trim())) {
            errEmailElement.textContent = "email không đúng định dạng";
            isValidate = false;
        } else {
            errEmailElement.textContent = "";
        }
    }

    if (!passWordInputElement.value.trim()) {
        errPassWordElement.textContent = "Mật khẩu không được để trống";
        isValidate = false;
    } else {
        errPassWordElement.textContent = "";
    }

    if (!checkboxElement.checked) {
        errCheckboxElement.textContent = "Vui lòng tích trước khi đăng nhập";
        isValidate = false;
    } else {
        errCheckboxElement.textContent = "";
    }

    if (isValidate) {
        let user = accounts.find(acc => acc.email === emailInputElement.value.trim() && acc.pass === passWordInputElement.value.trim())

        if (!user) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Email hoặc mật khẩu không đúng",
            });

            emailInputElement.value = "";
            passWordInputElement.value = "";

            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(user));

        Swal.fire({
            title: "Đăng nhập thành công",
            icon: "success",
            confirmButtonText: "OK"
        }).then(() => {
            if (user.role === "admin") {
                window.location.href = "category-manager.html";
            } else {
                window.location.href = "dashboard.html";
            }
        });
    }
})