import React from 'react';
import './Home.css';
import DisplayFood from '../DisplayFood';
import AboutUs from './AboutUs';


function Home(props){

  return(
    <div>
      <div className="maingDivHome">
        <div className="info__home">
         <h2>always choose good</h2>
         <a href="#menu" className="btn"> Our menu !</a>
        </div>
      </div>
      <AboutUs/>
      <DisplayFood/>
    </div>
  );
};

export default Home;
