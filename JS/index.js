(function () {
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

const userKey = "users";
let users = JSON.parse(localStorage.getItem(userKey));
if (users == null)
    users = [];

let regName = /^[A-Z][a-zA-Z]{2,}\s[A-Z][a-zA-Z]{2,}$/;
let regEmail = /^[a-zA-Z0-9\._#\$]+@[a-zA-Z]+\.[a-zA-Z]{2,4}$/;
let regPassword = /^.{6,}$/;

/// Register Module
let registerForm = document.getElementById('register-form');
let registerNameInput = document.getElementById("register-name");
let registerEmailInput = document.getElementById("register-email");
let registerPasswordInput = document.getElementById("register-password");
let registerNameValidation = document.getElementById("register-name-validation");
let registerEmailValidation = document.getElementById("register-email-validation");
let registerEmailFoundValidation = document.getElementById("register-email-found-validation");
let registerPasswordValidation = document.getElementById("register-password-validation");

function checkRegisterName() {

    console.log(registerNameInput.value, regName.test(registerNameInput.value));
    if (!regName.test(registerNameInput.value)) {
        registerNameValidation.classList.add("d-block");
        registerNameValidation.classList.remove("d-none");

        registerNameInput.classList.add("is-invalid");
        return false;
    } else {
        registerNameValidation.classList.add("d-none");
        registerNameValidation.classList.remove("d-block");
        registerNameInput.classList.remove("is-invalid");

        return true;
    }
}

function checkRegisterPassword() {
    if (!regPassword.test(registerPasswordInput.value)) {
        registerPasswordValidation.classList.add("d-block");
        registerPasswordValidation.classList.remove("d-none");

        registerPasswordInput.classList.add("is-invalid");
        return false;
    } else {
        registerPasswordValidation.classList.remove("d-block");
        registerPasswordValidation.classList.add("d-none");

        registerPasswordInput.classList.remove("is-invalid");
        return true;
    }
}

function checkRegisterEmail(emailFound) {
    if (!regEmail.test(registerEmailInput.value)) {
        registerEmailValidation.classList.add("d-block");
        registerEmailValidation.classList.remove("d-none");;

        registerEmailInput.classList.add("is-invalid");
        return false;
    } else if (emailFound) {
        registerEmailValidation.classList.remove("d-block");
        registerEmailValidation.classList.add("d-none");;
        registerEmailFoundValidation.classList.add("d-block");
        registerEmailFoundValidation.classList.remove("d-none");

        registerEmailInput.classList.add("is-invalid");
        return false;
    } else {
        registerEmailValidation.classList.remove("d-block");
        registerEmailFoundValidation.classList.remove("d-block");
        registerEmailFoundValidation.classList.add("d-none");
        registerEmailValidation.classList.add("d-none");

        registerEmailInput.classList.remove("is-invalid");

        return true;
    }
}

function register() {
    let userModel = {
        "username": registerNameInput.value,
        "email": registerEmailInput.value,
        "password": registerPasswordInput.value,
    };
    users.push(userModel);
    localStorage.setItem(userKey, JSON.stringify(users));
    registerForm.reset();
    registerForm.submit();
}


document.getElementById("btn-register").onclick = registerSubmit;


function registerSubmit() {
    let emailFound = false;

    for (const user of users) {
        if (user.email === registerEmailInput.value) {
            emailFound = true;
            break;
        }
    }
    let emailValid = checkRegisterEmail(emailFound);
    let nameValid = checkRegisterName();
    let passwordValid = checkRegisterPassword();

    console.log(emailValid, nameValid, passwordValid);

    if (emailValid && nameValid && passwordValid) {
        registerEmailInput.classList.add("is-valid");
        registerNameInput.classList.add("is-valid");
        registerPasswordInput.classList.add("is-valid");

        document.getElementById("register-alert").classList.remove("d-none");
        document.getElementById("register-alert").classList.add("d-block");

        register();
    }
}

/// Login Module
let loginForm = document.getElementById('login-form');
let loginEmailInput = document.getElementById("login-email");
let loginPasswordInput = document.getElementById("login-password");
let loginEmailValidation = document.getElementById("login-email-validation");
let loginEmailFoundValidation = document.getElementById("login-email-found-validation");
let loginPasswordValidation = document.getElementById("login-password-validation");
let loginPasswordMatchValidation = document.getElementById("login-password-match-validation");

function checkLoginPassword(passwordMatch) {
    if (!regPassword.test(loginPasswordInput.value)) {
        loginPasswordValidation.classList.add("d-block");
        loginPasswordValidation.classList.remove("d-none");

        loginPasswordInput.classList.add("is-invalid");
        return false;
    } else if (!passwordMatch) {
        loginPasswordValidation.classList.remove("d-block");
        loginPasswordValidation.classList.add("d-none");

        loginPasswordMatchValidation.classList.add("d-block");
        loginPasswordMatchValidation.classList.remove("d-none");

        loginPasswordInput.classList.add("is-invalid");
        return false;
    } else {
        loginPasswordValidation.classList.remove("d-block");
        loginPasswordValidation.classList.add("d-none");
        loginPasswordMatchValidation.classList.remove("d-block");
        loginPasswordMatchValidation.classList.add("d-none");

        loginPasswordInput.classList.remove("is-invalid");
        return true;
    }
}

function checkLoginEmail(emailFound) {
    if (!regEmail.test(loginEmailInput.value)) {
        loginEmailValidation.classList.add("d-block");
        loginEmailValidation.classList.remove("d-none");

        loginEmailInput.classList.add("is-invalid");
        return false;
    } else if (!emailFound) {
        loginEmailValidation.classList.remove("d-block");
        loginEmailValidation.classList.add("d-none");

        loginEmailFoundValidation.classList.add("d-block");
        loginEmailFoundValidation.classList.remove("d-none");

        loginEmailInput.classList.add("is-invalid");
        return false;
    } else {
        loginEmailValidation.classList.remove("d-block");
        loginEmailValidation.classList.add("d-none");

        loginEmailInput.classList.remove("is-invalid");
        return true;
    }
}

function login() {
    let emailFound = false;
    let passwordMatch = false;
    for (const user of users) {
        if (user.email === loginEmailInput.value) {
            emailFound = true;
            if (user.password === loginPasswordInput.value) {
                passwordMatch = true;
                break;
            }
        }
    }
    let emailValid = checkLoginEmail(emailFound);
    let passwordValid = checkLoginPassword(passwordMatch);

    if (emailValid && passwordValid) {
        document.getElementById("login-alert").classList.remove("d-none");
        document.getElementById("login-alert").classList.add("d-block");

        loginForm.reset();
        loginForm.submit();
    }
}

document.getElementById("btn-login").onclick = login;