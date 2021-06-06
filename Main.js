'use strict'

const path = require('path')
const { app, ipcMain } = require('electron')

const Window = require('./app/Window')
const Datastore = require('./app/Datastore')

const employeedb = new Datastore({name:'employees'})

function main() {

    let mainWindow = new Window({
        file: path.join('app', 'index.html')
    })

    let  addEmployee

    ipcMain.on('add-employee-window', () => {

        if(!addEmployee){
        console.log('event trigged add-employee-window')
         addEmployee = new Window({
            file: path.join('app', 'add_employee.html'),
            width: 400,
            height: 400,
            paretn: mainWindow
        })

        addEmployee.on('closed', () => {
            addEmployee = null;
        })
    }
    })

    ipcMain.on('add-employee', (event, name) => {
        console.log('event triggered add-employee')
        employeedb.addEmployee(name);
    })

}

app.on('ready', main)
app.on('window-all-closed', function() {
    app.quit()
})