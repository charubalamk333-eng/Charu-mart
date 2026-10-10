"use strict";

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");
const emailInput = document.getElementById("email");

// Show / Hide Password
if (passwordInput && togglePassword) {
    togglePassword.addEventListener("click", function () {
        const show = passwordInput.type === "password";
        passwordInput.type = show ? "text" : "password";
        togglePassword.textContent = show ? "Hide" : "Show";
    });
}

// Login
if (loginForm && loginMessage && emailInput && passwordInput) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        loginMessage.textContent = "";

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            loginMessage.textContent = "Please enter a valid email address.";
            loginMessage.style.color = "#B42318";
            emailInput.focus();
            return;
        }

        if (!password.trim()) {
            loginMessage.textContent = "Please enter your password.";
            loginMessage.style.color = "#B42318";
            passwordInput.focus();
            return;
        }

        const loginButton = loginForm.querySelector(
            'button[type="submit"]'
        );

        loginButton.disabled = true;
        loginButton.textContent = "LOGGING IN...";

        try {
            const response = await fetch(
                "http://localhost:8080/api/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                loginMessage.textContent =
                    data.message || "Invalid email or password.";
                loginMessage.style.color = "#B42318";
                return;
            }

            // Store basic user details for the current frontend demo.
            // This is not a secure authentication session.
            sessionStorage.setItem("charuMartUser", JSON.stringify({
                id: data.id,
                name: data.name,
                email: data.email,
                role: data.role
            }));

            loginMessage.textContent = "Login successful! Opening shop...";
            loginMessage.style.color = "#16803C";

            setTimeout(function () {
                window.location.href = "home.html";
            }, 1000);

        } catch (error) {
            loginMessage.textContent =
                "Cannot connect to the server. Make sure the backend is running.";
            loginMessage.style.color = "#B42318";
        } finally {
            loginButton.disabled = false;
            loginButton.textContent = "LOGIN";
        }
    });
}