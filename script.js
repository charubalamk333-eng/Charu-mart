// Show / Hide Password

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "Show";
    }

});


// Login Form

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {

        loginMessage.textContent = "Please enter your email and password.";
        loginMessage.style.color = "#B42318";

        return;
    }

    loginMessage.textContent = "Login successful! Redirecting...";
loginMessage.style.color = "#142B4A";

setTimeout(function () {
    window.location.href = "home.html";
}, 1000);

});