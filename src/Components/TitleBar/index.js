import React, { useState } from 'react';
import {FiMinus, FiMinimize, FiMaximize, FiX} from 'react-icons/fi'

import './styles.css'

const ipcRenderer = window.require('electron').ipcRenderer

const Titlebar = () => {

    const [isActive, setIsActive] = useState()
    const [isMaximized, setIsMaximized] = useState()

    ipcRenderer.on('focused', () => {
        setIsActive(true)
    })

    ipcRenderer.on('blurred', () => {
        setIsActive(false)
    })

    ipcRenderer.on('maximized', () => {
        setIsMaximized(true)
    })

    ipcRenderer.on('unmaximized', () => {
        setIsMaximized(false)
    })

    const minimizeHandler = () => {
        ipcRenderer.invoke('minimize-event')
    }

    const maximizeHandler = () => {
        ipcRenderer.invoke('maximize-event')
    }

    const unmaximizeHandler = () => {
        ipcRenderer.invoke('unmaximize-event')
    }

    const closeHandler = () => {
        ipcRenderer.invoke('close-event')
    }

    return (
        <div className="Titlebar">
            <div className={isActive ? 'Title-Bar' : 'Title-Bar-inactive'} >
                <div className="Titlebar-drag-region"></div>

                <div className="title-bar-section-logo">
                </div>

                <div className="title-bar-section-menu">
                </div>

                <div className="title-bar-section-center">
                </div>

                <div className="title-bar-section-windows-control-container">
                    
                    <div className="windows-control-box-container">
                        <div className="button minize">
                            <FiMinus onClick={minimizeHandler} size={18}/>
                        </div>
                    </div>
                    
                    {isMaximized ?
                        
                        <div className="windows-control-box-container">
                            <div className="button maximize" >
                                <FiMinimize onClick={unmaximizeHandler} size={18}/>
                            </div>
                        </div>
                        :
                        <div className="windows-control-box-container">
                            <div className="button maximize">
                                <FiMaximize onClick={maximizeHandler} size={18} />
                            </div>
                        </div>
                    }

                    <div className="windows-control-box-container">
                        <div className="button close">
                            <FiX onClick={closeHandler} size={18} />
                        </div>
                    </div>
                </div>

                <div
                    style={isMaximized ? { display: 'none' } : {}}
                    className="resizer">
                </div>
            </div>
        </div >
    )
}

export default Titlebar