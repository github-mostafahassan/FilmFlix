


import React, { Component, PureComponent } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { SaideBar } from '../SAID BAR/SaideBar'

export class LeyOet extends Component {
    
    
    render() {
        return <>

        
        
        <SaideBar/>

        

        <Outlet/>
        </>
    }
}

