"use strict";

const { ipcRenderer } = require("electron");
const getEmployeeRegister = require("./service/registry_service.js");
const RegistryDataStore = require("../app/RegistryDataStore.js");
const registrydb = new RegistryDataStore({ name: "registry" });

document.getElementById("registryForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const date = event.target[0].value;
  const emp = event.target[1].value.split(".");
  const entrytime = event.target[2].value;
  const endtime = event.target[3].value;

  const empname = emp.slice(1);
  const empid = emp[0];

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

  displayEmployeeEfforts();
});

ipcRenderer.on("refresh", (event) => {
  displayEmployeeEfforts();
});

document.getElementById("empdd").addEventListener("click", (event) => {
  displayEmployeeEfforts();
});

function displayEmployeeEfforts() {
  let register = document.getElementById("emp-register");
  let selected = document.getElementById("empdd").value;

  let result = new getEmployeeRegister(selected.split(".")[0]);
  register.innerHTML = getDisplayEffortsHtml(result);
}

function getDisplayEffortsHtml(result) {
  let count = 1;
  let table_data = "";
  result.forEach((datedata) => {
    const tr = datedata.reduce((html, elem) => {
      html += `<tr>
      <th scope="row">${count++}</th>
      <td>${elem["data"]["empname"]}</td>
      <td>${elem["date"]}</td>
      <td>${elem["data"]["starttime"]} - ${elem["data"]["endtime"]}</td>
      </tr>`;
      return html;
    }, "");
    table_data += tr;
  });

  return table_data;
}
