import React, { useEffect, useState } from 'react'
import './admin.scss';
import SideBar from '../sidebar/SideBar.jsx'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setDesc } from '../../redux/user';
import { toast } from 'react-toastify';

export default function Admin() {
  const [temdesc,setTemdesc]=useState("-");
  const [edit,setEdit]=useState(false);
  const {baseUrl,desc}=useSelector(state=>state.user)
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post(
        `${baseUrl}/user/add/desc`,
        { desc: temdesc},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      
      toast(res.message)
    } catch (error) {      
      toast.error(error.response.data.message)
      console.log(error.response.data.message);
    }
  };

  useEffect(()=>{
    setTemdesc(desc);
  },[desc])

  return (
    <div className='admin'>
        <SideBar/>
        <div className="main-container">
            <h1>Home Page</h1>
          <div className="desc-update">
          <h2>
            <span>Description</span>
            <button className="button" onClick={()=>setEdit(!edit)}>Edit</button>
          </h2>                
            <div className='text-area'>              
              <textarea name="desc" id="" value={temdesc} onChange={(e)=> setTemdesc(e.target.value)} disabled={!edit} ></textarea>
              <button className='button' onClick={handleSubmit}>Update</button>
            </div>
          </div>          
        </div>
    </div>
  )
}
