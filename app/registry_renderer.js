"use strict";

const { ipcRenderer } = require("electron");
const getEmployeeRegister = require("./service/registry_service.js");

document.getElementById("registryForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const date = event.target[0].value;
  const emp = event.target[1].value.split(".");
  const entrytime = event.target[2].value;
  const endtime = event.target[3].value;

  ipcRenderer.send("add-employee-efforts", [
    emp.slice(1),
    entrytime,
    endtime,
    date,
    emp[0],
  ]);
});

ipcRenderer.on("event-employees", (event, employees) => {
  let select = document.getElementById("empdd");

  console.log(employees);

  const items = employees.reduce((html, elem) => {
    html += `<option>${elem.id}.${elem.name}</option>`;
    return html;
  }, "");

  select.innerHTML = items;
});

ipcRenderer.on("refresh", (event) => {
  console.log("refresh called");
  displayEmployeeEfforts();
});

document.getElementById("empdd").addEventListener("click", (event) => {
  displayEmployeeEfforts();
});

function displayEmployeeEfforts() {
  let register = document.getElementById("emp-register");
  let selected = document.getElementById("empdd").value;

  let result = new getEmployeeRegister(selected.split(".")[0]);

  let count = 1;

  console.log(result);

  let table_data = "";
  result.forEach((datedata) => {
    const tr = datedata.reduce((html, elem) => {
      html += `<tr>
      <th scope="row">${count++}</th>
      <td>${elem["data"]["empname"]}</td>
      <td>${elem["date"]}</td>
      <td>${elem["data"]["starttime"]}</td>
      </tr>`;
      return html;
    }, "");
    table_data += tr;
  });

  register.innerHTML = table_data;
}
