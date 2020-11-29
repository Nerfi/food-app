import React from 'react';
import NavbarFood from './Navbar';
import video from './video/video.mp4';
import './Home.css';


function Home(){
  return(
    <div>
     <NavbarFood/>
     <div id="videobackground">
      <video autoPlay loop muted  src={video}    type="video/mp4">
     </video>

     </div>

    </div>

  );
};

export default Home;
