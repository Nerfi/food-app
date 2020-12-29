import React, {useState,useEffect} from 'react';
import {useRouteMatch} from 'react-router-dom';
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
    vegetarian,
    extendedIngredients
  } = response;


  //extracting data from API steps response
  const stepsAndMeasures = object => {
      return object?.map(step => (
        <div key={step.name}>
         <p>{step.name.toUpperCase()}</p>
         <div className="unitsAndAmount">
          <p className='amount'>{step.measures.us.amount}</p>
          <p>{step.measures.us.unitShort}</p>
         </div>
        </div>
      ))
  }


//create another function in order to handle the name of the product should be the first one capitalize and the rest nope

///replacing html tags
const replaceBtag = string => string.replace(/<.*?>/g, '')

const displaySteps = array => {
  return array && (
    <ol>
      {array[0].steps.map((step, index) => <li key={index}> {step.step}</li>)}
    </ol>
    )
  };
//function in order to display the tags of each meal
const tagsOfMeal = array => array?.map(tag => <div className="meal__tag">{tag}</div>);



  return (
    <div>
    {error && error}
      <div className="background" style={{backgroundImage: `url(${image})`}}>
        <div className="mealTitle">
         {title}
        </div>
      </div>
    <div className="descriptionRecipe">
     {summary && replaceBtag(summary)}
     <div className="originalUrl">
       <span>You can find the origin recipe here:</span>
       <p><a href={sourceUrl} target="_blank">See recipe</a></p>
     </div>

    </div>
  <div className="displayStepsAndIngredients">
      <div className="ingredientsMeal">
       <h2>Ingrediensts</h2>
       {stepsAndMeasures(extendedIngredients)}

      </div>

      <div className="mealSteps">
      <h2>Method</h2>
       {analyzedInstructions && displaySteps(analyzedInstructions)}
      </div>
  </div>

  </div>
  )
};

export default SingleMeal;
