import React from 'react';
import './Home.css';
import DisplayFood from '../DisplayFood';


function Home(props){

  return(
    <div>
      <div className="maingDivHome">
      </div>
        <div>
          <p>aqui deberia ir la parte de about us ! en un separate componetn</p>
        </div>
        <DisplayFood/>

    </div>
  );
};

export default Home;
