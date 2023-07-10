import React from 'react'
import './projectPage.scss';
import { Project } from '../projects/Projects';
import Header from '../header/Header';
import { useSelector } from 'react-redux';

export default function ProjectPage() {
  const {project}=useSelector(state=>state.user);
  window.scrollTo(0,0);

  return (
    <div id='project-page'>
      <Header/>
        <h1>Projects</h1>
        <div id='project-desc'>Build using various tech stacks as mentioned in Skills section</div>
        <div id='project-container'>
            {project.map((item,i)=>{
              return <Project project={item} key={i}/>            
            })}
        </div>
    </div>
  )
}
