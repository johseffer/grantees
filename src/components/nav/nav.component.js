import React from 'react'
import { A } from 'hookrouter'

import transfeeraIcon from './images/transfeera-logo-verde.svg';

import './nav.component.scss'

const Nav = () => {
    return (
        <>
            <div className="container">
                <div className="header">
                    <img className="iconeTransfera" alt="" src={transfeeraIcon} />
                </div>
                <div className="nav">
                    <A href="/">Seus Favorecidos</A>
                </div> 
            </div>
        </>
    )
}

export default Nav