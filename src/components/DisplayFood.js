import React,{useState, useEffect} from 'react';
import FoodCard from './UI/FoodCard';
import './DisplayFood.css';

function DisplayFoods() {

  const [foods , setFoods] = useState([]);
  const [error, setError] = useState(null);

  //useEffect API call
  useEffect(() => {

      const getFoodsResponse = async () => {

        const API_SECRET = process.env.REACT_APP_FOOD_KEY;
        const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_SECRET}&number=21`;

        await fetch(url)
        .then(res => res.json())
        .then(res => setFoods(res.results))
        .catch(err =>  setError(err.message))
      };

      //calling the function
      //getFoodsResponse();

  },[]);


  return(
    <div className="food__cards">
      {foods?.map(food => <FoodCard {...food} key={food.id}/>)}
    </div>
  );
};


export default DisplayFoods;
