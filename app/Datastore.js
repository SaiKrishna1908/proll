const Store = require("electron-store");
const { settings } = require("cluster");
const Employee = require("./model/Employee");
class Datastore extends Store {
  constructor() {
    super(settings);
    this.employees = this.get("employees") || [];
  }

  saveEmployees() {
    this.set("employees", this.employees);
    return this;
  }

  getEmployees() {
    this.employees = this.get("employees") || [];
    return this.employees;
  }

  addEmployee(name, salary, doj) {
    let employee = new Employee(name, this.employees.length + 1);
    employee.setSalary(salary);
    employee.setDoj(doj);
    this.employees = [...this.employees, employee];
    return this.saveEmployees();
  }

  deleteEmployee(id) {
    this.employees = this.employees.filter((e) => e.id !== id);
    return this.saveEmployees();
  }

  getNameById(id) {
    return this.employees.filter((i) => i.id == id)[0].name;
  }

  getEmployeeById(id) {
    return this.employees.filter((i) => i.id == id)[0];
  }
}

module.exports = Datastore;
