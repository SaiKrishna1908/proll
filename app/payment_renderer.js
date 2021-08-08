"use strict";

const { ipcRenderer } = require("electron");

const getEmployeePayment = require("./service/payments.js");

ipcRenderer.on("event-payment", (event, employees) => {
  let select = document.getElementById("empdd");

  console.log(employees);

  const items = employees.reduce((html, elem) => {
    html += `<option>${elem.id}.${elem.name}</option>`;
    return html;
  }, "");

  select.innerHTML = items;
});

document.getElementById("paymentForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const ename = event.target[0].value;
  const eid = ename.split(".")[0];
  const basicworkhours = event.target[1].value;
  const overtimeprice = event.target[2].value;
  const month = event.target[3].value;

  let paymentInfo = new getEmployeePayment(
    eid,
    basicworkhours,
    overtimeprice,
    month
  );

  let workinghoursph = document.getElementById("workinghoursph");
  let overtimeph = document.getElementById("overtimeph");
  let paymentph = document.getElementById("paymentph");

  let work = 0;
  paymentInfo[0].forEach((elem) => {
    work += parseInt(elem["efforts"]) - parseInt(elem["overtime"]);
  });

  let overtimehours = 0;

  paymentInfo[0].forEach((elem) => {
    overtimehours += parseInt(elem["overtime"]);
  });

  workinghoursph.innerHTML = `<b>Hour's Worked:</b> ${work} H`;
  overtimeph.innerHTML = `<b>Overtime:</b> ${overtimehours} H`;
  paymentph.innerHTML = `<b>Pay:</b> ${paymentInfo[1]} \u20B9`;
});
