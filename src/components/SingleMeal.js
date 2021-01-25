import React, {useState,useEffect, useContext} from 'react';
import {useRouteMatch} from 'react-router-dom';
import './SingleMeal.css';
import {apiHelper} from '../API/api';
import firebase from '../firebase/firebase';
import { UserContext} from '../AuthContext/UserContext';


function SingleMeal(props) {


  const [response, setResponse] = useState({});
  const [error, setError] = useState(null);
  const [s,setS] = useState({})
  const [loading, setLoading] = useState(false);


  const {uid, displayName}  = useContext(UserContext);
  let {params} = useRouteMatch();
  //secret key
  const API_SECRET = process.env.REACT_APP_FOOD_KEY;


  useEffect(() => {

      const fetchSingleMeal = async () => {
        setLoading(old => !old)

        const url = `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${API_SECRET}`;
        await apiHelper(url)
          .then(res => setResponse(res))
          .catch(e =>  setError(e.message))

       setLoading(old => !old)
      }
      //calling the fucntion
      fetchSingleMeal();

  },[params.id]);

//working
if(loading)return <p style={{marginTop: '50px'}}>loading</p>

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
     ));
  }


///replacing html tags
const replaceBtag = string => string.replace(/<.*?>/g, '')

const displaySteps = array => {
  return array && (
    <ol>
      {array[0]?.steps?.map((step, index) => <li key={index}> {step.step}</li>)}
    </ol>
    )
  };
//function in order to display the tags of each meal
const tagsOfMeal = array => array?.map(tag => <div className="meal__tag">{tag}</div>);


//adding to firebase
const addToDb = (e) => {

  e.preventDefault();

  firebase.firestore()
    .collection('users')
    .doc(uid)
    .collection('saved')
    .add({
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
    })
    .then(res =>  setS(res))

}


  return (
    <div>
    {error && error}
      <div className="background" style={{backgroundImage: `url(${image})`}}>
       <div className="saveIcon">
       </div>
        <div className="mealTitle">
         {title}
        </div>
        <div onClick={addToDb} >
          <i className=" extraClass fa fa-bookmark"  style={{ width: '120px', marginTop: '37rem'}}></i>
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
