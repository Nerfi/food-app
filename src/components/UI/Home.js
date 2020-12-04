import React from 'react';

import video from './video/video.mp4';
import './Home.css';
import DisplayFood from '../DisplayFood';



function Home(props){
  console.log(props, 'home props from react-router-dom')

  return(
    <div>
     <div id="videobackground">

      <video className="video"
      autoPlay
      loop
       muted
       src={video}
      type="video/mp4">
     </video>

     </div>

      <DisplayFood/>

    </div>

  );
};

export default Home;
