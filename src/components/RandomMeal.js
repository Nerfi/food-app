import  React,{useState} from 'react';
import './RandomMeal.css';
import FoodCard from './UI/FoodCard';
import TagsSelection from './UI/TagsSelection';

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
        .then(res => setRandom({res: res.recipes}))
  };

  console.log(random, 'random')


return (
    <div className='content'>
      <div>{error && <p>something went wrong...</p>}</div>

      <TagsSelection select={select} tags={tags}/>

     <div className="button">
      <button onClick={fetchRandom}>Search for random recipies</button>
     </div>

     <div className="displayMeals">
      {random?.res?.map(meal => <FoodCard {...meal} key={meal.id}/> )}
    </div>

  </div>
)

};

export default RandomMeal;
