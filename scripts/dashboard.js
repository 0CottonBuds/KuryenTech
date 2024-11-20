import {
  addAppliance,
  addBill,
  getAppliancesOfUser,
  getBillsOfUser,
} from "./firebase";

const username = localStorage.getItem("username");
const appliances = await getAppliancesOfUser(username);

var labels = [];
var data = [];

appliances.forEach((doc) => {
  labels.push(doc.data().name);
  const kwh_per_week =
    doc.data().KW_HR * doc.data().HR_per_day * doc.data().days_per_week;
  data.push(kwh_per_week);
});

const ctx = document.getElementById("myChart");
new Chart(ctx, {
  type: "bar",
  data: {
    labels: labels,
    datasets: [
      {
        label: "kw/week per Appliances",
        data: data,
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

  var text1 = document.createTextNode(data.date);
  var text2 = document.createTextNode(data.total_cost);
  var text3 = document.createTextNode(data.total_kwH);

  td1.appendChild(text1);
  td2.appendChild(text2);
  td3.appendChild(text3);

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);

  data_table.append(tr);
});

const ctx1 = document.getElementById("myLineChart");
new Chart(ctx1, {
  type: "line",
  data: {
    labels: dates,
    datasets: [
      {
        label: "Bill Cost every month in PHP",
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
