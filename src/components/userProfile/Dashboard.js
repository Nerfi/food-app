import React,{useState, useEffect, useContext} from  'react';
import './Dashboard.css';
import {firebase} from '../../firebase/firebase';
import { UserContext} from '../../AuthContext/UserContext';
import FoodCard from '../UI/FoodCard';
import {useHistory} from 'react-router-dom';



const Dashboard = () => {

  const [saved, setSaved] = useState([]);
  const [error, setError] = useState(null);
  const {uid, email, displayName, photoURL} = useContext(UserContext);
  const {user} = useContext(UserContext);


  //using history object
  const history = useHistory();

  useEffect(() => {

    const meals = async () => {

      let retrieveMeals = [];

      let snapshot = await firebase.firestore()
          .collection('users')
          .doc(user.uid)
          .collection('saved')
          .get()


      snapshot.forEach(doc => doc.exists ? retrieveMeals.push(doc.data()) : null )
      setSaved(retrieveMeals);

   };

  meals();


  },[])

  //temporary const
  const image = null;



  return(
    <div className="dashboard">
    {error && <p>something went wrong...{error}</p>}
      <div className="userData">

        <img src={photoURL ? photoURL : ''}
        alt="userProfile"
        style={{ borderRadius: '70%', height: '50vh'}}/>

       <div className="userInfo">
       <h3>{ user?.displayName }</h3>
       <p>{user?.email}</p>
       </div>
       <div className="changeDataBtn">

       <i class="fa fa-edit" style={{fontSize: '28px'}} onClick={() => history.push("/update-user-data")}></i>
       <p>update your profile</p>
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
