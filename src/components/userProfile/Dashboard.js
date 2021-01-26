import React,{useState, useEffect, useContext} from  'react';
import './Dashboard.css';
import firebase from '../../firebase/firebase';
import { UserContext} from '../../AuthContext/UserContext';
import FoodCard from '../UI/FoodCard';



const Dashboard = () => {

  const [saved, setSaved] = useState([]);
  const [error, setError] = useState(null);
  const {uid, email, displayName} = useContext(UserContext);

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

  console.log(saved, 'saved')




  return(
    <div className="dashboard">
    {error && <p>something went wrong {error}</p>}
      <div className="userData">

       <img src="https://images.unsplash.com/photo-1569087682520-45253cc2e0ee?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
        alt="userImag profile" style={{ borderRadius: '70%', height: '50vh'}}/>

       <div className="userInfo">
       <h3>{displayName}</h3>
       <p>{email}</p>
       </div>
      </div>

      <div className="savedMeals">
      <h2>My saved meals </h2>

        <div className="savedMealsCard">
        { saved?.map(meal => <FoodCard {...meal} key={meal.id} />)}

        </div>

      </div>
    </div>
  )
};

export default Dashboard;
