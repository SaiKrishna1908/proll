'use strict'

const path = require('path')
const { app, ipcMain } = require('electron')

const Window = require('./app/Window')
const Datastore = require('./app/Datastore')
const RegistryDataStore = require('./app/RegistryDataStore')

const employeedb = new Datastore({name:'employees'})
const registrydb = new RegistryDataStore({name: 'registry'})
function main() {

    let mainWindow = new Window({
        file: path.join('app', 'index.html')
    })

  

    //mainWindow.removeMenu();
    let  addEmployee
    let  registryWindow
    ipcMain.on('add-employee-window', () => {

        if(!addEmployee){

        console.log('event trigged add-employee-window')
        addEmployee = new Window({
            file: path.join('app', 'add_employee.html'),
            width: 500,
            height: 500,
            parent: mainWindow
            
        })
        // addEmployee.removeMenu()

        addEmployee.on('closed', () => {
            addEmployee = null;
        })
    }
    })

    ipcMain.on('add-employee', (event, input) => {
        console.log(input)
        employeedb.addEmployee(input[0], input[1], input[2]);
        addEmployee.send('employee-added');
    })

    ipcMain.on('show-registry-window', () => {

        
        if(!registryWindow) {
            console.log('event triggered show-regristry-window')
            registryWindow = new Window({
                file: path.join('app','registry.html'),
                width: 800,
                height: 800,
                parent: mainWindow
                
            })

            registryWindow.once('show', () => {
            registryWindow.webContents.send('event-employees', employeedb.getEmployees()) 
            })
            registryWindow.on('closed', ()=> {
                registryWindow = null;
            })
        }
    })

    ipcMain.on('add-employee-efforts', (event, input) => {
        console.log(input);
        registrydb.addEmployeeEfforts(input[3], {"empid":input[0],"starttime":input[1],
        "endtime": input[2]});
    })

}

app.on('ready', main)
app.on('window-all-closed', function() {
    app.quit()
})