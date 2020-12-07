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

  //can not replace <a> tags
  const replaceBtag = string => string.replace(/[<b> </b>  ]/g, ' ');

  //deconstructing the object response
  const {
    image,
    title,
    summary,
    sourceUrl,
    spoonacularScore,
    analyzedInstructions,
    cuisines,
    diets,
    dishTypes,
    vegan,
    vegetarian
  } = response;

const displaySteps = (array) => {

  let newSteps

  newSteps = array && array[0].steps.map((step, index) => {
    return(
       <p>number {index} <li><ul>{step.step}</ul></li>  </p>
    )

  })

 return newSteps;
};

  return (
    <div className="single__meal">
    {error && error}

      <div className="single__meal__header">
        <img src={image} alt="meal"/>
        <h2 className="single__meal__title">{title}</h2>
      </div>

      <div className="single__meal__tags">

        <div className="single__meal__cuisines">
         <p> Cuisines:</p>
          <p>{cuisines &&cuisines.map(c => c + ' ,' )}</p>
        </div>

          <div className="single__meal__dishType">
          <p>DishTypes:</p>
          <p>{dishTypes && dishTypes.map(d => <p>{d}</p>)}</p>
          </div>
          <div className="single__meal__score">
           <p>Score:</p>
           <p>{spoonacularScore}  out of 100</p>
          </div>

          <div className="single__meal__diets">
           <p onClick={(e) => alert('working' + e.target.value)} >Diets:</p>
           <p>{diets && diets.map(d =><p>{d}</p>)}</p>
          </div>

      </div>

      <div className="single__meal__description">
      <strong className="description__title">Description</strong>:
        <p> {summary && replaceBtag(summary)}</p>
      </div>

      <div className="single__meal__body">

        <p>you can chech the originla recipe here {sourceUrl}</p>
        <p> vegan ?{vegan ? 'true': 'false'}</p>
        <p>vegetarian {vegetarian ? 'true' : 'false'}</p>
      </div>

      <div className="single__meal__steps">

       <p>{analyzedInstructions && displaySteps(analyzedInstructions)}</p>

      </div>

    </div>
  )
};

export default SingleMeal;
