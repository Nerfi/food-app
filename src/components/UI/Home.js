import React from 'react';
import NavbarFood from './Navbar';
import video from './video/video.mp4';
import './Home.css';
import DisplayFood from '../DisplayFood';



function Home(){

  return(
    <div>
  {/* move the navbar from here when using router*/}
     <NavbarFood/>

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
