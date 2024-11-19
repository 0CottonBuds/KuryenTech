import { getAppliancesOfUser, addAppliance } from "./firebase";

const username = localStorage.getItem("username");

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("add-appliance")
    .addEventListener("click", async (event) => {
      event.preventDefault(); // Prevent form from reloading the page

      console.log("submit");

      const appliance = document.getElementById("appliance").value;
      const kwh = document.getElementById("kWh").value;
      const hoursPerDay = document.getElementById("hours-per-day").value;
      const daysPerWeek = document.getElementById("days-per-week").value;

      try {
        await addAppliance(username, appliance, kwh, hoursPerDay, daysPerWeek);

        window.location.href = "/pages/dashboard.html";
      } catch (error) {
        console.error("Error during authentication:", error);
        alert("An error occurred. Please try again later.");
      }
    });
});

const appliances = await getAppliancesOfUser(username);
const appliances_table = document.getElementById("appliances-table");

appliances.forEach((doc) => {
  const data = doc.data();

  var tr = document.createElement("tr");

  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var td4 = document.createElement("td");

  var text1 = document.createTextNode(data.name);
  var text2 = document.createTextNode(data.HR_per_day);
  var text3 = document.createTextNode(data.KW_HR);
  var text4 = document.createTextNode(data.days_per_week);

  td1.appendChild(text1);
  td2.appendChild(text2);
  td3.appendChild(text3);
  td4.appendChild(text4);

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);

  appliances_table.appendChild(tr);
});
