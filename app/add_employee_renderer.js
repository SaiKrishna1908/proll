const { ipcRenderer } = require('electron')
const datastore = require('./Datastore')


document.getElementById('addEmployee').addEventListener('submit',
(event) => {
    event.preventDefault()
    console.log(event.target)
    const input = [event.target[0].value, event.target[1].value];
    ipcRenderer.send('add-employee', input)
    input.value=''
}
)