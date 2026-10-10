"use strict";

const registerForm = document.getElementById("registerForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const togglePassword = document.getElementById("togglePassword");
const registerMessage = document.getElementById("registerMessage");

function showMessage(message, success = false) {
    registerMessage.textContent = message;
    registerMessage.style.color = success ? "#16803C" : "#B42318";
}

if (togglePassword) {
    togglePassword.addEventListener("click", function () {
        const show = passwordInput.type === "password";
        passwordInput.type = show ? "text" : "password";
        togglePassword.textContent = show ? "Hide" : "Show";
    });
}

registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    showMessage("");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (name.length < 2 || name.length > 100) {
        showMessage("Enter a name between 2 and 100 characters.");
        nameInput.focus();
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMessage("Please enter a valid email address.");
        emailInput.focus();
        return;
    }

    if (
        password.length < 8 ||
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/[0-9]/.test(password) ||
        !/[^A-Za-z0-9]/.test(password)
    ) {
        showMessage(
            "Password needs 8+ characters, uppercase, lowercase, a number and a special character."
        );
        passwordInput.focus();
        return;
    }

    if (password !== confirmPassword) {
        showMessage("Passwords do not match.");
        confirmPasswordInput.focus();
        return;
    }

    const submitButton = registerForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = "CREATING ACCOUNT...";

    try {
        const response = await fetch("http://localhost:8080/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            showMessage(data.message || "Registration failed.");
            return;
        }

        showMessage("Account created successfully! Redirecting to login...", true);
        registerForm.reset();

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);

    } catch (error) {
        showMessage(
            "Cannot connect to the server. Make sure the Charu Mart backend is running."
        );
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "CREATE ACCOUNT";
    }
});