import React from 'react'
import './Header.css';
import covide_virus_cell from '../images/covid_virus_cel.png';
function Header() {
    return (
        <div className="header">
            <img src={covide_virus_cell} alt=""/>
            <h2>Covid-19 Tracker </h2>
        </div>
    )
}

export default Header
