import { getUser } from "./firebase";

const username = localStorage.getItem("username");
const userData = await getUser(username);

var data = undefined;

userData.forEach((doc) => (data = doc.data()));
console.log("Name: ", data);

const name = data.name;
const email = data.email;
const address = data.address;
const target_cost = data.target_cost;

const name_element = document.getElementById("name");
const username_element = document.getElementById("username");
const email_element = document.getElementById("email");

name_element.innerHTML = name;
username_element.innerHTML = username;
email_element.innerHTML = email;

document.getElementById("edit-name").placeholder = name;
document.getElementById("edit-email").placeholder = email;
document.getElementById("edit-address").placeholder =
  address == undefined ? "No Address" : address;
document.getElementById("edit-target-watts").placeholder = target_cost;
