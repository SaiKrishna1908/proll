"use strict";

const RegistryDataStore = require("../RegistryDataStore");
const registrydb = new RegistryDataStore({ name: "registry" });

function getEmployeeRegister(empid) {
  let result = [];
  registrydb.getData().forEach((elem) => {
    let date_data = registrydb.getDataFromDate(elem["date"]);
    let emp_register = date_data.filter(
      (item) => item["data"]["empid"] == empid
    );
    result.push(emp_register);
  });

  return result;
}
module.exports = getEmployeeRegister;
