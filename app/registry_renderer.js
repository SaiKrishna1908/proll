'use strict'

const { ipcRenderer } = require('electron')


document.getElementById('date').addEventListener('input', (event) => {
    console.log('hello world')
})


document.getElementById("registryForm").addEventListener('submit', (event) => {
    event.preventDefault()
    const empid = event.target[0].value
    const efforts = event.target[1].value
    const date = event.target[2].value

    console.log(empid)
    console.log(efforts)
    console.log(date)
    
    
    ipcRenderer.send('add-employee-efforts', [empid,efforts,date])
})

ipcRenderer.on('event-employees', (event, employees) => {
    let select = document.getElementById('empdd');


    const items = employees.reduce((html, elem) => {
        html+= `<option>${(elem.name)}</option>`
        return html
    }, '')
    

    console.log(items)
    select.innerHTML = items
})