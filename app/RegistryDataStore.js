const Store = require("electron-store");
const { settings } = require("cluster");
const Datastore = require('./Datastore')

datastore = new Datastore({name: "employees"})
class RegistryDataStore extends Store {
  constructor() {
    super(settings);
    this.registry = this.get("registry") || []

  }

  saveRegistry() {
    this.set("registry", this.registry);
    return this;
  }

  addDateToRegistry(date) {
      console.log("creating new date")
        this.registry.push({ "date": date, "data": [] });
        this.saveRegistry();
        return this.registry;
  }

  getDataFromDate(date) {

    let res = this.registry.filter(i => i.date===date)[0].data
    return res
  }

  addEmployeeEfforts(date,data) {

    let dates = [];
    this.registry.forEach((i) => {
        dates.push(i.date)
    })

    if(!dates.includes(date)){
        this.registry = this.addDateToRegistry(date);
    }
    console.log(this.registry)
    let idx  = -1
    this.registry.forEach( (elem, index) => {
        if(elem.date === date)
            idx  = index
    })
    if (idx >= 0)
        if(!this.registry[idx].data[idx])
            this.registry[idx].data.push(data)
    return this.saveRegistry()
  }
}
module.exports = RegistryDataStore