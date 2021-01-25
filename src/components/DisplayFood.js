import React,{useState, useEffect} from 'react';
import FoodCard from './UI/FoodCard';
import './DisplayFood.css';
import {apiHelper} from '../API/api';

function DisplayFoods() {

  const [foods , setFoods] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {

     const API_SECRET = process.env.REACT_APP_FOOD_KEY;
     const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_SECRET}&number=21`;

     const getFood = async () => {

       const getFoodsResponse = await apiHelper(url)
        .then(res => setFoods(res.results))
        .catch(e => setError(e.message))

     }

    //getFood();

  },[]);


  return(
    <>
    <div className="menu__title">
     <h2>Our <span>M</span>enu</h2>
    </div>
    <div className="food__cards" id="menu">
      {foods?.map(food => <FoodCard {...food} key={food.id}/>)}
    </div>
    </>
  );
};


export default DisplayFoods;
