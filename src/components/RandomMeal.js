import  React from 'react';
import {useState, useEffect} from 'react';
import './RandomMeal.css';

function RandomMeal() {

  const [random, setRandom] = useState([]);
  //there is no error
  const [error, setError] = useState(null);
  //secret key
  const API_SECRET = process.env.REACT_APP_FOOD_KEY;

  useEffect(() => {

      const fetchRandomMeals = async () => {
        fetch(`https://api.spoonacular.com/recipes/random?number=3&tags=vegetarian,vegan&apiKey=${API_SECRET}`)
        .then(response => response.json())
        .then(res => setRandom(res))
        .catch(e => setError(e.message))
      }

      //callign the function
     // fetchRandomMeals();
  },[]);

  console.log(random)

  const click = (e) => alert('clike' + e.target.value)

  return (
    <div className='content'>
    <div className="tags" onClick={click}>
      <span>Healthy</span>
      <span>vegan</span>
      <span>vegetarian</span>
      <span>gluten free</span>
    </div>

    </div>
    )
};

export default RandomMeal;
