import React,{useState, useEffect, useContext} from  'react';
import './Dashboard.css';
import firebase from '../../firebase/firebase';
import { UserContext} from '../../AuthContext/UserContext';
import FoodCard from '../UI/FoodCard';



const Dashboard = () => {

  const [saved, setSaved] = useState([]);
  const [error, setError] = useState(null);
  const {uid, email, displayName, photoURL} = useContext(UserContext);

  useEffect(() => {

    const meals = async () => {

      let retrieveMeals = [];

      let snapshot = await firebase.firestore()
          .collection('users')
          .doc(uid)
          .collection('saved')
          .get()


      snapshot.forEach(doc => doc.exists ? retrieveMeals.push(doc.data()) : null )
      setSaved(retrieveMeals);

    };

  meals();


  },[])

  const image = null;

  return(
    <div className="dashboard">
    {error && <p>something went wrong {error}</p>}
      <div className="userData">

        <img src={photoURL ? photoURL : 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.TWY19cEEgmGPM4BFBBUcfQHaIZ%26pid%3DApi&f=1'}
        alt="userProfile"
        style={{ borderRadius: '70%', height: '50vh'}}/>
         {/* ADD LINK TO CHANGE SETTINGS OF THE PAGE , user profile*/}

       <div className="userInfo">
       <h3>{displayName}</h3>
       <p>{email}</p>
       </div>
      </div>

      <div className="savedMeals">
      <h2>My saved meals </h2>

        <div className="savedMealsCard">
        { saved.map(meal => <FoodCard {...meal} key={meal.id} />)}

        </div>

      </div>
    </div>
  )
};

export default Dashboard;
