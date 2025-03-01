// Function to redirect to a page
function redirectTo(page) {
    window.location.href = page;
}

//  Landing Page: Redirect to login when "Get Started" is clicked
document.addEventListener("DOMContentLoaded", function () {
    let startButton = document.getElementById("start-btn");
    if (startButton) {
        startButton.addEventListener("click", function () {
            redirectTo("login.html");
        });
    }

    //  Signup Page: Register User
    let signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();
            let password = document.getElementById("password").value.trim();
            let confirmPassword = document.getElementById("confirmPassword").value.trim();

            if (!name || !email || !password || !confirmPassword) {
                alert("Please fill in all fields.");
                return;
            }

            if (password.length < 6) {
                alert("Password must be at least 6 characters long.");
                return;
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }

            // Retrieve existing users from localStorage or initialize an empty array
            let users = JSON.parse(localStorage.getItem("users")) || [];

            // Check if email already exists
            let existingUser = users.find(user => user.email === email);
            if (existingUser) {
                alert("This email is already registered. Please log in.");
                return;
            }

            // Add new user and save to localStorage
            users.push({ name, email, password });
            localStorage.setItem("users", JSON.stringify(users));

            alert("Signup successful! Redirecting to login...");
            redirectTo("login.html");
        });
    }

    //  Login Page: Authenticate User & Redirect to Module Selection
    let loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let enteredEmail = document.getElementById("login-email").value.trim();
            let enteredPassword = document.getElementById("login-password").value.trim();

            // Retrieve users from localStorage
            let users = JSON.parse(localStorage.getItem("users")) || [];

            // Check if user exists
            let validUser = users.find(user => user.email === enteredEmail && user.password === enteredPassword);

            if (validUser) {
                alert("Login successful! Redirecting...");
                redirectTo("moduleselection.html");
            } else {
                alert("Invalid email or password. Please try again.");
            }
        });
    }
    //  Module Selection Page: Handle Click Events for Music Player Options
    let weatherPlayer = document.querySelector(".weather");
    let emotionPlayer = document.querySelector(".emotion");
    let vibeMode = document.querySelector(".vibe");

    if (weatherPlayer) {
        weatherPlayer.addEventListener("click", function () {
            redirectTo("weather-module.html");
        });
    }

    if (emotionPlayer) {
        emotionPlayer.addEventListener("click", function () {
            redirectTo("emotion-module.html");
        });
    }

    if (vibeMode) {
        vibeMode.addEventListener("click", function () {
            redirectTo("vibe-module.html");
        });
    }
    
});
function goBack() {
    window.location.href = "moduleselection.html";
}
