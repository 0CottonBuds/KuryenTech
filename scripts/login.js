import { AuthUser } from "/scripts/firebase.js";

localStorage.setItem("username", "");

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  document
    .getElementById("login-button")
    .addEventListener("click", async (event) => {
      event.preventDefault(); // Prevent form from reloading the page

      console.log("submit");
      // Get username and password values
      const username = document.getElementById("username-input").value;
      const password = document.getElementById("password-input").value;

      try {
        const isAuthenticated = await AuthUser(username, password);

        if (isAuthenticated) {
          // Redirect or perform other actions after successful login
          window.location.href = "/pages/profile.html";

          localStorage.setItem("username", username);
        } else {
          alert("Invalid username or password");
        }
      } catch (error) {
        console.error("Error during authentication:", error);
        alert("An error occurred. Please try again later.");
      }
    });
});
