import  React,{useState, useEffect} from 'react';
import {Nav} from 'react-bootstrap';
import './RandomMeal.css';

function RandomMeal() {

  const [random, setRandom] = useState([]);
  //there is no error
  const [error, setError] = useState(null);
  //setting tags state
  const [tags, setTags] = useState([]);
  //loading state
  const [loading, setLoading] = useState(false);
  //secret key
  const API_SECRET = process.env.REACT_APP_FOOD_KEY;

const select = (eventKey) => {
  //checking if we have already the values on the state array
  setTags((tags) => {
    if (tags.includes(eventKey)) {
      return tags;
     }

     return [...tags, eventKey];
  });
};

  //make API call when the user has selected the tags and click the button
  const fetchRandom = async () => {

      //joining the user tags
      const selectedTags = tags.join();

      //making the request
      await fetch(`https://api.spoonacular.com/recipes/random?number=6&tags=${selectedTags}&apiKey=${API_SECRET}`)
        .then(response => response.json())
        .then(res => setRandom(res))
        .catch(e => setError(e.message))
  };

//not working
  console.log(random?.map(meal => <p>{meal.title}</p>))
//response
//{recipes: Array(6)}
  return (
    <div className='content'>
    <div>{error && error}</div>
      <Nav className="justify-content-center"   onSelect={select} >
        <Nav.Item >
          <Nav.Link className={tags.includes('vegetarian') ?  'disabled' :  ''}  eventKey="vegetarian" >Vegetarian</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className={tags.includes('vegan')  ? 'disabled' :  ''} eventKey="vegan">Vegan</Nav.Link>
        </Nav.Item>
        <Nav.Item >
          <Nav.Link className={tags.includes('gluten Free')  ? 'disabled' :  ''} eventKey="gluten Free">Gluten Free</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className={tags.includes('Dairy Free')  ? 'disabled' :  ''} eventKey="Dairy Free" >
            Dairy Free
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className={tags.includes('very helthy')  ? 'disabled' :  ''} eventKey="very helthy" >
            Very Healthy
          </Nav.Link>
        </Nav.Item>

   </Nav>
   <div className="button">
    <button onClick={fetchRandom}>Search for random recipies</button>
   </div>

   <div className="displayMeals">

   </div>

    </div>
    )
};

export default RandomMeal;
