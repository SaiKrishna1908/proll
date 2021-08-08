const Store = require("electron-store");
const { settings } = require("cluster");
const Datastore = require("./Datastore");

datastore = new Datastore({ name: "employees" });
class RegistryDataStore extends Store {
  constructor() {
    super(settings);
    this.registry = this.get("registry") || [];
  }

  saveRegistry() {
    this.set("registry", this.registry);
    return this;
  }

  addDateToRegistry(date) {
    console.log("creating new date");
    this.registry.push({ date: date, data: [] });
    this.saveRegistry();
    return this.registry;
  }

  getDataFromDate(date) {
    let res = [];

    let filter_res = this.registry.filter((i) => i.date === date);

    filter_res[0]["data"].forEach((item) =>
      res.push({ date: date, data: item })
    );

    return res;
  }

  getData() {
    return this.registry;
  }

  addEmployeeEfforts(date, data) {
    let dates = [];
    this.registry.forEach((i) => {
      dates.push(i.date);
    });

    if (!dates.includes(date)) {
      this.registry = this.addDateToRegistry(date);
    }
    let idx = -1;
    this.registry.forEach((elem, index) => {
      if (elem.date === date) idx = index;
    });
    console.log(idx);
    if (idx >= 0) this.registry[idx].data.push(data);

    this.saveRegistry();
    return this.registry;
  }
}
module.exports = RegistryDataStore;
