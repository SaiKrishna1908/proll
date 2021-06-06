const { ipcRenderer } = require('electron')
const datastore = require('./Datastore')
document.getElementById('addEmployee').addEventListener('submit',
(event) => {
    event.preventDefault()

    const input = event.target[0]
    ipcRenderer.send('add-employee', input.value)
    input.value=''
}
)