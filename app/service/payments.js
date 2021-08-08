"use strict";

const Datastore = require("../Datastore");
const getEmployeeRegister = require("./registry_service.js");

let month_dict = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

function getEmployeePayment(eid, basicworkhours, overtimeprice, month) {
  const employeedb = new Datastore({ name: "employees" });

  let monthWorkingDays = [];
  let registry = new getEmployeeRegister(eid);
  let r;
  let totalEfforts = 0;
  let overtimeEfforts = 0;
  console.log(registry);
  registry.forEach((date) => {
    date.forEach((element) => {
      if (element.date.split("-")[1] == month) {
        console.log(element.data["endtime"]);

        let effortInMinutes = _getWorkingHours(
          element.data["starttime"],
          element.data["endtime"]
        );

        let overtime = 0;

        if (effortInMinutes > basicworkhours * 60) {
          overtime = effortInMinutes - basicworkhours * 60;
          overtimeEfforts += overtime;
        }

        monthWorkingDays.push({
          date: element.date,
          efforts: effortInMinutes / 60 + (effortInMinutes % 60),
          overtime: overtime / 60 + (overtime % 60),
        });

        totalEfforts += effortInMinutes;
      }
    });
  });

  let employee = employeedb.getEmployeeById(eid);

  console.log(totalEfforts);

  let salary =
    (totalEfforts /
      (parseInt(month_dict[parseInt(month)]) * basicworkhours * 60)) *
    parseInt(employee["salary"]);

  salary = salary + (overtimeEfforts / 60) * parseInt(overtimeprice);

  console.log(salary);

  return [monthWorkingDays, salary];
}

function _getWorkingHours(starttime, endtime) {
  let starthour = parseInt(starttime.split(":")[0]);
  let endhour = parseInt(endtime.split(":")[0]);

  let startmin = parseInt(starttime.split(":")[1]);
  let endmin = parseInt(endtime.split(":")[1]);

  return Math.abs(endhour - starthour) * 60 + Math.abs(startmin - endmin);
}
module.exports = getEmployeePayment;
