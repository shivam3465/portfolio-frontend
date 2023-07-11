import React from 'react'
import './home.scss'
import Featured from '../featured/Featured'
import About from '../about/About'
import Skills from '../skills/Skills'
import Projects from '../projects/Projects.jsx'
import Contact from '../contact/Contact.jsx'
import Header from '../header/Header'

export default function Home() {  
  
  return (
    <div id='home'>        
      <Header/>      
        <Featured/>
        <About />
        <Skills/>
        <Projects/>
        <Contact/>
    </div>
  )
}
