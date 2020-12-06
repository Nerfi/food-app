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

  console.log(response)

  //can not replace <a> tags
  const replaceBtag = string => string.replace(/[<b> </b>  ]/g, ' ');

  //deconstructing the object response
  const {
    image,
    title,
    summary,
    sourceUrl,
    spoonacularScore,
    analyzedInstructions
  } = response;

  //fucntion para ver si podemos hacerlo, not working as expected
const steps = analyzedInstructions &&  analyzedInstructions[0].steps;

const displaySteps = (array) => {

  let newSteps

  newSteps = array.map((step, index) => {
    return(
       <p>number {index} <li><ul>{step.step}</ul></li>  </p>
    )

  })

 return newSteps;
}
  return (
    <div className="single__meal">
    {error && error}

      <div className="single__meal__header">
        <img src={image} alt="meal"/>
        <h2>{title}</h2>
      </div>

      <div className="single__meal__body">

        <p> <strong>Description</strong>: {summary &&replaceBtag(summary)}</p>
        <p>you can chech the originla recipe here {sourceUrl}</p>
        <p>score:{spoonacularScore}</p>
      </div>

      <div className="single__meal__steps">

       <strong>steps</strong> { analyzedInstructions && analyzedInstructions[0].steps.map((step, index) =>  <p>number {index} <li><ul>{step.step}</ul></li>  </p>)}
       <p>{analyzedInstructions && displaySteps(analyzedInstructions)}</p>

      </div>

    </div>
  )
};

export default SingleMeal;
