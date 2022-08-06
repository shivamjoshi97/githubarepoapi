import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import { AiFillGithub,AiFillTwitterCircle } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import ReactPaginate from 'react-paginate';
export const Card = (props) => {
var [profile,setProfile] = useState(
  {username:'',bio:'',location:'',twitter:'',link:'',image:'',name:'',no_ofrepos:''}
);
let pagenumber = Math.ceil(profile.no_ofrepos/10);
var [items,setItems] = useState([]);
let { username } = useParams();
  useEffect(() => {
    const getComments = async()=>{
        const res = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=10&page=1`
        );
        const repodata = await res.json();
        setItems(repodata);
        const pro_res = await fetch(
          `https://api.github.com/users/${username}`
          );
          const userdata = await pro_res.json();
          setProfile({username:userdata.login,
          bio:userdata.bio,
          location:userdata.location,
          twitter:userdata.twitter_username,
          link:userdata.html_url,image:userdata.avatar_url,name:userdata.name,
          no_ofrepos:userdata.public_repos});
    }
    getComments();
}, [])
const fetchdata= async(current)=>{
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=10&page=${current}`
    );
    const data = await res.json();
    return data;
}
const handleChange=async(data)=>{
  console.log(data)
  let current_page = data.selected+1;
  const new_page_data = await fetchdata(current_page);
  setItems(new_page_data); 
}
console.log(items);
  return (
    <>
    <header className='mt-2 border-bottom color-border-muted'>
        <div className='row'>
          <div className='col-lg-12 d-flex align-items-center justify-content-center'>
            <h3 className='me-3'>Repositories</h3>
            <div className='repos'>{profile.no_ofrepos}</div>
          </div>
        </div>
      </header>
      <div className='containers'>
        <div className='row'>
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
          <div className='col-lg-9 col-md-8'>
                {items.map((number) =>
                    <div class="col-12 d-flex flex-justify-between width-full py-4 border-bottom color-border-muted private source">
                      <div className='col-10 col-lg-9'>
                        <h5>
                          <a className="reponame me-3" href={number.html_url} target="_blank">{number.name}</a>
                          <span class="Label Label--secondary v-align-middle ml-1 mb-1">Public</span>
                        </h5>
                        <div class="f6 color-fg-muted mt-2">
                          <span class="ml-0 mr-3">
                            <span class="repo-language-color me-2" style={{backgroundColor: "rgb(160, 254, 95)"}}></span>
                            <span className='me-5'>{number.language}</span>
                            <span className='fw-bolder me-2'>Updated On:</span><span>{number.pushed_at}</span>
                          </span>
                        </div>
                      </div>  
                      <div className='col-2 d-flex flex-column'>
                        <div class="js-toggler-container js-social-container starring-container BtnGroup d-flex star align-items-center">
                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-star d-inline-block mr-2">
                        <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                        </svg>
                        <span data-view-component="true" className="d-inline">Star</span>
                        </div>
                      </div>
                    </div>
                )}
                <ReactPaginate pageCount={pagenumber} containerClassName={'pagination justify-content-center align-item-center'} 
                pageClassName={'page-item'} pageLinkClassName={'page-link'} onPageChange={handleChange} 
                previousClassName={'page-item'} previousLinkClassName={'page-link'} nextClassName={'page-item'} nextLinkClassName={'page-link'}
                breakClassName={'page-item'} breakLinkClassName={'page-link'} activeClassName={'active'}
                ></ReactPaginate>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card;