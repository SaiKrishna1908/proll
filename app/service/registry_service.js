"use strict";

const RegistryDataStore = require("../RegistryDataStore");
// let registrydb = new RegistryDataStore({ name: "registry" });

function getEmployeeRegister(empid) {
  let result = [];

  let registrydb = new RegistryDataStore({ name: "registry" });
  registrydb.getData().forEach((elem) => {
    let date_data = registrydb.getDataFromDate(elem["date"]);
    let emp_register = date_data.filter(
      (item) => item["data"]["empid"] == empid
    );
    if (emp_register.length > 0) result.push(emp_register);
  });

  return result;
}

module.exports = getEmployeeRegister;
