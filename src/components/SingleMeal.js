import React, {useState,useEffect} from 'react';
import {useRouteMatch} from 'react-router-dom';
import FoodCard from './UI/FoodCard';
import './SingleMeal.css';


function SingleMeal(props) {

  const [response, setResponse] = useState({});
  const [error, setError] = useState(null);

  let {params} = useRouteMatch();
  //secrete key
  const API_SECRET = process.env.REACT_APP_FOOD_KEY;

  useEffect(() => {

    const fetchSingleMeal = async () => {

      const url = `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${API_SECRET}`;
      //fetching data
    await fetch(url)
        .then(res => res.json())
        .then(res => setResponse(res))
        .catch(e => setError(e.message))
    }

    //calling the function
    fetchSingleMeal();

  },[params.id]);


  return (
    <div className="single__meal">
    {error && error}

      <FoodCard {...response}/>
    </div>
  )
};

export default SingleMeal;
