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
    //fetchSingleMeal();

  },[params.id]);

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

  console.log(response, 'response');

  //can not replace <a> tags
  const replaceBtag = string => string.replace(/[<b> </b>  ]/g, ' ');

//working but make sure to improve it later on
const displaySteps = (array) =>  array && array[0].steps.map((step, index) => <ul><li key={index}>{step.step}</li></ul>);

//function in order to display the tags of each meal
const tagsOfMeal = array => array?.map(tag => <div className="meal__tag">{tag}</div>);

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

         <div className="cousine">
          {cuisines && tagsOfMeal(cuisines)}
         </div>

        </div>

          <div className="single__meal__dishType">
            <p>DishTypes:</p>

            <div className="dish">
            {dishTypes && tagsOfMeal(dishTypes)}
            </div>

          </div>
          <div className="single__meal__score">
           <p>Score:</p>
             <div className="score">
             <p>{spoonacularScore}  out of 100</p>
             </div>
          </div>

          <div className="single__meal__diets">
           <p>Diets:</p>
           <div className="diets">
             {diets && tagsOfMeal(diets)}
           </div>
          </div>

      </div>

      <div className="single__meal__description">
      <strong className="description__title">Description</strong>:
         {summary && replaceBtag(summary)}
      </div>

      <div className="single__meal__body">

           <p>You can find the Original recipe here: {sourceUrl}</p>

           <div className="vegan">
              <p> vegan <br/>{vegan ? 'true': 'false'}</p>

            <p>vegetarian <br/>{vegetarian ? 'true' : 'false'}</p>
           </div>
      </div>

      <div className="single__meal__steps">
       {analyzedInstructions && displaySteps(analyzedInstructions)}
      </div>

    </div>
  )
};

export default SingleMeal;
