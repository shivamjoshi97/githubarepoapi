import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import User from './User';
export const Card = (props) => {
  let { username } = useParams();
  var [repodata,setRepodata] = useState([{}]);
  console.log(props);
  useEffect(() => {
    axios.get(`https://api.github.com/users/${username}/repos`)
    .then(res => {
        var repodata = res.data;
        setRepodata(repodata);
    })
    .catch(() => {
        alert('There was an error while retrieving the data')
    })
}, [])
  return (
    <>
    <header className='mt-2 border-bottom color-border-muted'>
        <div className='row'>
          <div className='col-lg-12 d-flex align-items-center justify-content-center'>
            <h3 className='me-3'>Repositories</h3>
            <div className='repos'>{repodata.length}</div>
          </div>
        </div>
      </header>
      <div className='containers'>
        <div className='row'>
          <User data={username}></User>
          <div className='col-lg-9'>
                {repodata.map((number) =>
                    <div class="col-12 d-flex flex-justify-between width-full py-4 border-bottom color-border-muted private source">
                      <div className='col-10 col-lg-9'>
                        <h5>
                          <a className="reponame me-3" href="#/">{number.name}</a>
                          <span class="Label Label--secondary v-align-middle ml-1 mb-1">Public</span>
                        </h5>
                        <div class="f6 color-fg-muted mt-2">
                          <span class="ml-0 mr-3">
                            <span class="repo-language-color me-2" style={{backgroundColor: "rgb(160, 254, 95)"}}></span>
                            <span itemprop="programmingLanguage">{number.language}</span>
                          </span>
                        </div>
                      </div>  
                      <div className='col-2 d-flex flex-column'>
                        <div class="js-toggler-container js-social-container starring-container BtnGroup d-flex star align-items-center">
                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-star d-inline-block mr-2">
                        <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                        </svg>
                        <span data-view-component="true" class="d-inline">Star</span>
                        </div>
                      </div>
                    </div>
                )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Card;