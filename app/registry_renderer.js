'use strict'

const { ipcRenderer } = require('electron')


document.getElementById("registryForm").addEventListener('submit', (event) => {
    event.preventDefault()

    const date = event.target[0].value  
    const empid = event.target[1].value
    const entrytime = event.target[2].value
    const endtime = event.target[3].value
    
    ipcRenderer.send('add-employee-efforts', [empid,entrytime,endtime,date])
})

ipcRenderer.on('event-employees', (event, employees) => {
    let select = document.getElementById('empdd');
    
    console.log(employees);

    const items = employees.reduce((html, elem) => {
        html+= `<option>${(elem.name)}</option>`
        return html
    }, '')
    

    console.log(items)
    select.innerHTML = items
})