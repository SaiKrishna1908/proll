const { ipcRenderer, ipcMain } = require('electron')
const datastore = require('./Datastore')


document.getElementById('addEmployee').addEventListener('submit',
(event) => {
    event.preventDefault()
    console.log(event.target)
    const input = [event.target[0].value, event.target[1].value, event.target[2].value];
    ipcRenderer.send('add-employee', input)
    input.value=''
}
)

ipcRenderer.on('employee-added', (event) => {

    console.log('employee-added event triggered')
    const element = document.getElementById('add-employee-status');
    element.classList.add('alert')
    element.classList.add('alert-primary')
    element.innerHTML = 'Employee Added Successfully, close this window'

    setTimeout(( ) => {
        element.innerHTML = ''
        element.classList.remove('alert')
        element.classList.remove('alert-primary')    
    }, 2000)
})

