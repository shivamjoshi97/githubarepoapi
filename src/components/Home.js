import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../App.css';
export const Home = () => {
  const navigate = useNavigate();
  const [username,setUsername] = useState(null);
  const change=(event)=>{
    setUsername(event.target.value);
  }
  const senddata=()=>{
    if(username===null)
    {
      alert("Usernae can not be null")
    }
    else{
      navigate(`/details/${username}`);
    }
  }
  return (

    <div className='homepage d-flex align-items-center justify-content-center'>
      <div className='row'>
          <div className='col-7'>
            <input type="text" placeholder='Enter Your Username' onChange={change} required="true"></input>
          </div>
          <div className='col-5'>
            <button className='submitbutton' onClick={senddata}>find Repositiry
            </button>
          </div>
      </div>
    </div>
  )
}

export default Home;
