'use strict'

const { BrowserWindow } = require('electron')

const defaultProps = {

    width: 800,
    height: 800,
    webPreferences: {
        contextIsolation: false,
        nodeIntegration: true
    }
}

class Window extends BrowserWindow{

    constructor({file, ...windowSetting}){
        super({...defaultProps, ...windowSetting})
        this.loadFile(file)
        this.once('ready-to-show', () => {
            this.show()
        })
    }
}

module.exports = Window
