import React, { useEffect } from 'react';
import './sidebar.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAbout, setDesc, setUser } from '../../redux/user';

export default function SideBar() {
  const {baseUrl}=useSelector(state=>state.user)
  const dispatch = useDispatch();

  useEffect(()=>{
    const fetcher= async ()=>{
      try {
        const { data } = await axios.get(
          `${baseUrl}/user/me`,        
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        dispatch(setUser(data.user));
        dispatch(setDesc(data.user.desc))
        dispatch(setAbout(data.user.aboutMe))      
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
    fetcher();
  },[])
  return (
    <div id='sidebar'>
        <div id='admin-title'>
            ADMIN PAGE
        </div>
        <div id='admin-navbar'>
            <Link className='sidebar-item' to={'/admin/home'}>Home page</Link>
            <Link className='sidebar-item' to={'/admin/about'}>About page</Link>
            <Link className='sidebar-item' to={'/admin/skill'}>Skills page</Link>
            <Link className='sidebar-item' to={'/admin/coding'}>Coding Profiles</Link>
            <Link className='sidebar-item' to={'/admin/project'}>Project page</Link>
        </div>
    </div>
  )
}
