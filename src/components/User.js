import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { AiFillGithub,AiFillTwitterCircle } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
export const User = (props) => {
    var [profile,setProfile] = useState(
        {username:'',bio:'',location:'',twitter:'',link:'',image:'',name:''}
      );
      useEffect(() => 
        {
            axios.get(`https://api.github.com/users/${props.data}`)
                .then(res => {
                    var userdata = res.data;
                    setProfile({username:userdata.login,
                                bio:userdata.bio,
                                location:userdata.location,
                                twitter:userdata.twitter_username,
                                link:userdata.html_url,image:userdata.avatar_url,name:userdata.name});
                })
                .catch(() => {
                    alert('There was an error while retrieving the data')
                });
        }, [])
  return (
    <div className='col-lg-3 col-md-4'>
      <div className='row'>
          <div className='profile-image col-sm-4 col-lg-12 col-md-12 col-7'>
                  <img src={profile.image} alt="profile"/>
          </div>
          <div className='mt-2 col-sm-8 col-lg-12 col-md-12 col-9'>
            <h3>{profile.name}</h3>
            <h5 className='text-muted'>{profile.username}</h5>
            <div className='d-flex align-items-center'>
              <p className='fs-7'>{profile.bio}</p>
            </div>
            <div className='d-flex align-items-center'>
              <span><HiLocationMarker className='me-2'></HiLocationMarker></span>
              <span className='mt-1'>{profile.location}</span>
            </div>
            <div className='d-flex align-items-center'>
              <span><AiFillTwitterCircle className='me-2'></AiFillTwitterCircle></span>
              <span>{profile.twitter}</span>
            </div>
            <div className='d-flex align-items-center'>
              <span><AiFillGithub className='me-2'></AiFillGithub></span>
              <span>{profile.link}</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default User;
