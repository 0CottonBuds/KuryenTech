import { registerUser } from "./firebase";

registerUser("test", "test", "test", "test");

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("signup-form");

  document
    .getElementById("signup-button")
    .addEventListener("click", async (event) => {
      event.preventDefault(); // Prevent form from reloading the page

      console.log("submit");
      // Get username and password values
      const name = document.getElementById("input-name").value;
      const email = document.getElementById("input-email").value;
      const username = document.getElementById("input-username").value;
      const password = document.getElementById("input-password").value;

      try {
        registerUser(email, name, username, password);

        document.getElementById("feedback").value =
          "Successfully registered user";
        window.location.href = "/pages/login.html";
      } catch (error) {
        console.error("Error during authentication:", error);
        document.getElementById("feedback").value =
          "Error: Cannot register user";
        alert("An error occurred. Please try again later.");
      }
    });
});
