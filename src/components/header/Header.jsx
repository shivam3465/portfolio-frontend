import React from 'react'
import './header.scss'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div id='header'>
        <Link to='/admin' target='blank'>
          <div id="left">SHIVAM</div>        
        </Link>
        <div id="right">
            <Link to={'/'}>Home</Link>
            <a href={'#about'}>About</a>
            <a href={'#skills'}>Skills</a>
            <a href={'#projects'}>Projects</a>
            {/* <a href={'#demo'}>Demo Videos</a> */}
            <a href={'#contact'}>Contact</a>
        </div>
    </div>
  )
}
