import  React from 'react';
import {useState, useEffect} from 'react';
import {Nav} from 'react-bootstrap';
import './RandomMeal.css';

function RandomMeal() {

  const [random, setRandom] = useState([]);
  //there is no error
  const [error, setError] = useState(null);
  //setting tags state
  const [tags, setTags] = useState([]);

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
  console.log( typeof tags) //string

  //selecting element function
  const select = eventKey => {
    //taking the state array
    let originalTags = tags;
    //creating new array with correct values
    let newTags;

    newTags =  tags.filter((elem, pos) => {
       return originalTags.indexOf(elem) == pos;
        originalTags.push(newTags)
    })
    //updating the state
    return setTags( newTags);



  }


console.log(tags)





 //working
  console.log(tags)



  return (
    <div className='content'>
      <Nav className="justify-content-center"   onSelect={select} >
        <Nav.Item >
          <Nav.Link  eventKey="vegetarian" >Tech</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link  eventKey="vegan">News</Nav.Link>
        </Nav.Item>
        <Nav.Item >
          <Nav.Link  eventKey="Health">Health</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link  eventKey="Travel" >
            Travel
          </Nav.Link>
        </Nav.Item>
   </Nav>
    </div>
    )
};

export default RandomMeal;
