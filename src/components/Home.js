import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
export const Home = () => {
  const [username,setUsername] = useState();
  const change=(event)=>{
    setUsername(event.target.value);
  }
  return (
    <div className='homepage d-flex align-items-center justify-content-center'>
      <input type="text" placeholder='Enter Your Username' onChange={change}></input>
      <button className='submitbutton'><Link className='navlink' 
      to={{pathname:`/details/${username}`}}>find Repositiry</Link></button>
    </div>
  )
}

export default Home;
