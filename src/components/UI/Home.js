import React from 'react';
import './Home.css';
import DisplayFood from '../DisplayFood';
import AboutUs from './AboutUs';


function Home(props){

  return(
    <div>
      <div className="maingDivHome">
      </div>
      <AboutUs/>
      <DisplayFood/>
    </div>
  );
};

export default Home;
