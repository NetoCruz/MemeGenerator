import React from 'react' 
import Logo from '../images/Logo.png'
import './Header.css'

export default function Header(){
    return(
       <header>
        <img src={Logo} alt='logo'/>
        <p>React Course</p>
       </header>   
    )
}