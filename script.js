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
        signupForm.addEventListener("submit",async function (event) {
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

            const requestBody ={
                name: name,
                email: email,
                password:password

            }

            try{
                const signUpUser = await fetch('http://localhost:5000/api/auth/register', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requestBody)
                });
                const response = await signUpUser.json();
                if(response.ok){
                    showToast('Sign up successful','success')
                }
                redirectTo('login.html');

            }catch(err){
                showToast(err,'danger')
            }
        });
    }

    //  Login Page: Authenticate User & Redirect to Module Selection
    let loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit",async function (event) {
            event.preventDefault();

            let enteredEmail = document.getElementById("login-email").value.trim();
            let enteredPassword = document.getElementById("login-password").value.trim();
            // Check if user exists
            const requestBody ={
                email: enteredEmail,
                password:enteredPassword

            }

            try{
                const loginUser = await fetch('http://localhost:5000/api/auth/login', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requestBody)
                });
                const response = await loginUser.json();
                if(response.ok){
                    showToast('Login up successful','success')
                }
                redirectTo('moduleselection.html');

            }catch(err){
                showToast(err,'danger')
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

function showToast(message, type) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: type === "success" ? "#28a745" : "#dc3545",
    }).showToast();
}

