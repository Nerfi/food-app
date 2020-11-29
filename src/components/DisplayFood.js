import React,{useState, useEffect} from 'react';

function DisplayFoods() {

  const [foods , setFoods] = useState([]);
  const [error, setError] = useState(null);

  //useEffect API call
  useEffect(() => {

      const getFoodsResponse = async () => {

        const API_SECRET = process.env.REACT_APP_FOOD_KEY;
        const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_SECRET}&number=20`;

        await fetch(url)
        .then(res => res.json())
        .then(res => setFoods(res.results))
        .catch(err =>  setError(err.message))


      };

      //calling the function
      getFoodsResponse();

  },[]);




  return(

      <p>working from food component {error && error}</p>
  );
};


export default DisplayFoods;
