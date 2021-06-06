const { ipcRenderer } = require('electron')

document.getElementById('nav-add-employee').addEventListener('click', () => {
    ipcRenderer.send('add-employee-window')
})