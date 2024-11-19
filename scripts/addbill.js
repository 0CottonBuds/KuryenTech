import { addBill, getBillsOfUser } from "./firebase";

const username = localStorage.getItem("username");

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  document
    .getElementById("add-bill-button")
    .addEventListener("click", async (event) => {
      event.preventDefault(); // Prevent form from reloading the page

      console.log("submit");
      // Get username and password values
      const kwh = document.getElementById("kwh").value;
      const cost = document.getElementById("cost").value;

      try {
        const date = new Date();
        await addBill(
          username,
          date.getMonth() + " " + date.getFullYear(),
          kwh,
          cost
        );

        location.href = "/pages/dashboard.html";
      } catch (error) {
        console.error("Error during authentication:", error);
        alert("An error occurred. Please try again later.");
      }
    });
});

const bills = await getBillsOfUser(username);
const data_table = document.getElementById("history-table");

var dates = [];
var costs = [];

bills.forEach((doc) => {
  const data = doc.data();

  dates.push(data.date);
  costs.push(data.total_cost);

  var tr = document.createElement("tr");

  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var td4 = document.createElement("td");

  var text1 = document.createTextNode(data.date);
  var text2 = document.createTextNode(data.total_cost);
  var text3 = document.createTextNode(data.total_kwH);
  var text4 = document.createTextNode(0);

  td1.appendChild(text1);
  td2.appendChild(text2);
  td3.appendChild(text3);
  td4.appendChild(text4);

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);

  data_table.append(tr);
});

const ctx1 = document.getElementById("myLineChart");
new Chart(ctx1, {
  type: "line",
  data: {
    labels: dates,
    datasets: [
      {
        label: "",
        data: costs,
        borderWidth: 1,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
