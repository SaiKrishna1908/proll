const { ipcRenderer } = require('electron')

document.getElementById('nav-add-employee').addEventListener('click', () => {
    ipcRenderer.send('add-employee-window')
})

document.getElementById('nav-registry').addEventListener('click', () => {
    ipcRenderer.send('show-registry-window')
})

document.getElementById('nav-payment').addEventListener('click', () => {
    ipcRenderer.send('show-payment-window')
})