import React, { useState } from 'react'
import './skils.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Skill=({skill})=>{    
    return (
        <div className='skill'>            
            <img src={skill.image.image_url} alt="" />
            <div>{skill.name}</div>            
        </div>
    );
}
const Profile=({profile})=>{
    return (
        <div className='profile'>
            <Link to={profile.profileLink} target='blank'>
                <img src={profile.image.image_url} alt="" />
                <div>{profile.name}</div>
            </Link>
        </div>
    )
}

export default function Skills() {
    const profiles=["Codechef","CodeForces","LeetCode","Github"];
    const [toogle,setToogle]=useState(true);
    const {skills,coding}=useSelector(state=>state.user)
    
  return (
    <div id='skills'>
        <div id='skills-section'>
            <div onClick={()=>setToogle(!toogle)} className={toogle ? "skill-active":""}>Skills</div>
            <div onClick={()=>setToogle(!toogle)} className={!toogle ? "skill-active" : ""}>Coding Profiles</div>
        </div>

        {
        toogle ?
        <div id="skill-container">
        {
            skills.map((skill,key)=>{
                return <Skill key={key} skill={skill}/>;
            })
        }
        </div>
        :
        <div id="coding-profile">                  
            {
                coding.map((profile,i)=>{
                    return <Profile profile={profile} key={i}/>
                })
            }
        </div>
        }
    </div>
  )
}
