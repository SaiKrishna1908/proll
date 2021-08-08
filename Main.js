"use strict";

const path = require("path");
const {
  app,
  ipcMain,
  BrowserWindow,
  webContents,
  ipcRenderer,
} = require("electron");

const Window = require("./app/Window");
const Datastore = require("./app/Datastore");
const RegistryDataStore = require("./app/RegistryDataStore");

const employeedb = new Datastore({ name: "employees" });
const registrydb = new RegistryDataStore({ name: "registry" });
function main() {
  let mainWindow = new Window({
    file: path.join("app", "index.html"),
  });

  //mainWindow.removeMenu();
  let addEmployee;
  let registryWindow;
  let paymentWindow;
  ipcMain.on("add-employee-window", () => {
    if (!addEmployee) {
      console.log("event trigged add-employee-window");
      addEmployee = new Window({
        file: path.join("app", "add_employee.html"),
        width: 500,
        height: 500,
        parent: mainWindow,
      });
      // addEmployee.removeMenu()

      addEmployee.on("closed", () => {
        addEmployee = null;
      });
    }
  });

  ipcMain.on("add-employee", (event, input) => {
    console.log(input);
    employeedb.addEmployee(input[0], input[1], input[2]);
    addEmployee.send("employee-added");
  });

  ipcMain.on("show-registry-window", () => {
    if (!registryWindow) {
      console.log("event triggered show-regristry-window");
      registryWindow = new Window({
        file: path.join("app", "registry.html"),
        width: 1000,
        height: 1000,
        parent: mainWindow,
      });

      registryWindow.once("show", () => {
        registryWindow.webContents.send(
          "event-employees",
          employeedb.getEmployees()
        );
      });
      registryWindow.on("closed", () => {
        registryWindow = null;
      });
    }
  });

  ipcMain.on("show-payment-window", () => {
    if (!paymentWindow) {
      console.log("event triggered payment page");

      paymentWindow = new Window({
        file: path.join("app", "payment.html"),
        width: 1000,
        height: 1000,
        parent: mainWindow,
      });

      paymentWindow.once("show", () => {
        paymentWindow.webContents.send(
          "event-payment",
          employeedb.getEmployees()
        );
      });
      paymentWindow.on("closed", () => {
        paymentWindow = null;
      });
    }
  });

  ipcMain.on("add-employee-efforts", (event, input) => {
    console.log(input);

    let name = "";

    input[0].forEach((item) => {
      name += item;
    });

    if (
      name.length > 0 &&
      input[1].length > 0 &&
      input[2].length > 0 &&
      input[3].length > 0
    ) {
      registrydb.addEmployeeEfforts(input[3], {
        empname: name,
        starttime: input[1],
        endtime: input[2],
        empid: input[4],
      });
    }

    registryWindow.webContents.send("refresh");
  });
}

app.on("ready", main);
app.on("window-all-closed", function () {
  app.quit();
});
