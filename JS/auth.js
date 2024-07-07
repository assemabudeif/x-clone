// Constants
const userKey = "users";
const displayBlock = "d-block";
const displayNone = "d-none";
const isInvalid = "is-invalid";

let users = JSON.parse(localStorage.getItem(userKey));
if (users == null)
    users = [];

// Regex
let regName = /^[A-Z][a-zA-Z]{2,}\s[A-Z][a-zA-Z]{2,}$/;
let regEmail = /^[a-zA-Z0-9\._#\$]+@[a-zA-Z]+\.[a-zA-Z]{2,4}$/;
let regPassword = /^.{6,}$/;

// Register Module
let registerForm = $('#register-form');
let registerNameInput = $("#register-name");
let registerEmailInput = $("#register-email");
let registerPasswordInput = $("#register-password");
let registerNameValidation = $("#register-name-validation");
let registerEmailValidation = $("#register-email-validation");
let registerEmailFoundValidation = $("#register-email-found-validation");
let registerPasswordValidation = $("#register-password-validation");

// Login Module
let loginForm = $('#login-form');
let loginEmailInput = $("#login-email");
let loginPasswordInput = $("#login-password");
let loginEmailValidation = $("#login-email-validation");
let loginEmailFoundValidation = $("#login-email-found-validation");
let loginPasswordValidation = $("#login-password-validation");
let loginPasswordMatchValidation = $("#login-password-match-validation");


$(document).ready(function () {


    (function () {
        window.addEventListener('load', function () {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            let forms = $('#needs-validation');
            // Loop over them and prevent submission
            let validation =
                Array.prototype.filter.call(forms, function (form) {
                    form.on('submit', function (event) {
                        if (form.checkValidity() === false) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        form.addClass('was-validated');
                    }, false);
                });
        }, false);
    })();


    // Register
    $.fn.checkRegisterName = function () {

        console.log($(this).val(), regName.test($(this).val()));
        if (!regName.test($(this).val())) {
            registerNameValidation.addClass(displayBlock);
            registerNameValidation.removeClass(displayNone);

            $(this).addClass(isInvalid);
            return false;
        } else {
            registerNameValidation.addClass(displayNone);
            registerNameValidation.removeClass(displayBlock);
            $(this).removeClass(isInvalid);

            return true;
        }
    }

    $.fn.checkRegisterPassword = function () {
        if (!regPassword.test($(this).val())) {
            registerPasswordValidation.addClass(displayBlock);
            registerPasswordValidation.removeClass(displayNone);

            $(this).addClass(isInvalid);
            return false;
        } else {
            registerPasswordValidation.removeClass(displayBlock);
            registerPasswordValidation.addClass(displayNone);

            $(this).removeClass(isInvalid);
            return true;
        }
    }

    $.fn.checkRegisterEmail = function (emailFound) {
        if (!regEmail.test($(this).val())) {
            registerEmailValidation.addClass(displayBlock);
            registerEmailValidation.removeClass(displayNone);

            $(this).addClass(isInvalid);
            return false;
        } else if (emailFound) {
            registerEmailValidation.removeClass(displayBlock);
            registerEmailValidation.addClass(displayNone);
            registerEmailFoundValidation.addClass(displayBlock);
            registerEmailFoundValidation.removeClass(displayNone);

            $(this).addClass(isInvalid);
            return false;
        } else {
            registerEmailValidation.removeClass(displayBlock);
            registerEmailFoundValidation.removeClass(displayBlock);
            registerEmailFoundValidation.addClass(displayNone);
            registerEmailValidation.addClass(displayNone);

            $(this).removeClass(isInvalid);

            return true;
        }
    }

    function register() {
        let userModel = {
            "username": registerNameInput.val(),
            "email": registerEmailInput.val(),
            "password": registerPasswordInput.val(),
        };
        users.push(userModel);
        localStorage.setItem(userKey, JSON.stringify(users));
        registerForm.trigger("reset");
        location.reload();
        // registerForm.trigger("submit");
    }

    function registerSubmit() {
        let emailFound = false;

        for (const user of users) {
            if (user.email === registerEmailInput.val()) {
                emailFound = true;
                break;
            }
        }
        let nameValid = registerNameInput.checkRegisterName();
        let emailValid = registerEmailInput.checkRegisterEmail(emailFound);
        let passwordValid = registerPasswordInput.checkRegisterPassword();

        console.log(emailValid, nameValid, passwordValid);

        if (emailValid && nameValid && passwordValid) {
            registerEmailInput.addClass("is-valid");
            registerNameInput.addClass("is-valid");
            registerPasswordInput.addClass("is-valid");

            $("#register-alert").removeClass(displayNone).addClass(displayBlock);

            register();
        }
    }

    $("#btn-register").click(function () {
        registerSubmit();
    });


    // Login Module
    function checkLoginPassword(passwordMatch) {
        if (!regPassword.test(loginPasswordInput.val())) {
            loginPasswordValidation.addClass(displayBlock);
            loginPasswordValidation.removeClass(displayNone);

            loginPasswordInput.addClass(isInvalid);
            return false;
        } else if (!passwordMatch) {
            loginPasswordValidation.removeClass(displayBlock);
            loginPasswordValidation.addClass(displayNone);

            loginPasswordMatchValidation.addClass(displayBlock);
            loginPasswordMatchValidation.removeClass(displayNone);

            loginPasswordInput.addClass(isInvalid);
            return false;
        } else {
            loginPasswordValidation.removeClass(displayBlock);
            loginPasswordValidation.addClass(displayNone);
            loginPasswordMatchValidation.removeClass(displayBlock);
            loginPasswordMatchValidation.addClass(displayNone);

            loginPasswordInput.removeClass(isInvalid);
            return true;
        }
    }

    function checkLoginEmail(emailFound) {
        if (!regEmail.test(loginEmailInput.val())) {
            loginEmailValidation.addClass(displayBlock);
            loginEmailValidation.removeClass(displayNone);

            loginEmailInput.addClass(isInvalid);
            return false;
        } else if (!emailFound) {
            loginEmailValidation.removeClass(displayBlock);
            loginEmailValidation.addClass(displayNone);

            loginEmailFoundValidation.addClass(displayBlock);
            loginEmailFoundValidation.removeClass(displayNone);

            loginEmailInput.addClass(isInvalid);
            return false;
        } else {
            loginEmailValidation.removeClass(displayBlock);
            loginEmailValidation.addClass(displayNone);

            loginEmailInput.removeClass(isInvalid);
            return true;
        }
    }

    function login() {
        let emailFound = false;
        let passwordMatch = false;
        for (const user of users) {
            if (user.email === loginEmailInput.val()) {
                emailFound = true;
                if (user.password === loginPasswordInput.val()) {
                    passwordMatch = true;
                    break;
                }
            }
        }
        let emailValid = checkLoginEmail(emailFound);
        let passwordValid = checkLoginPassword(passwordMatch);

        if (emailValid && passwordValid) {
            $("#login-alert").removeClass(displayNone).addClass(displayBlock);
            const currentUser = {
                email: loginEmailInput.val(),
                password: loginPasswordInput.val(),
            };
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            loginForm.trigger("reset");
            loginForm.trigger("submit");
        }
    }

    $("#btn-login").click(function () {
        login();
    });
})