import React,{useState, useEffect, useContext} from  'react';
import './Dashboard.css';
import firebase from '../../firebase/firebase';
import { UserContext} from '../../AuthContext/UserContext';



const Dashboard = () => {

  const [saved, setSaved] = useState([]);
  const [error, setError] = useState(null);
  const {uid, email, displayName} = useContext(UserContext);



  useEffect(()  => {

    const meals = async () => {

      await firebase.firestore()
            .collection('users')
            .doc(uid)
            .collection('saved')
            .get()
            .then(doc => console.log(doc.data(), 'linea 25'))
            .catch(e => setError(e.message))

    };

    meals();



  },[]);



  return(
    <div className="dashboard">
      <div className="userData">
       <img src="https://images.unsplash.com/photo-1569087682520-45253cc2e0ee?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
        alt="userImag profile" style={{ borderRadius: '70%', height: '50vh'}}/>
        <div className="upload">
         <input type="file" className="imgUpload"/>
        </div>
       <div className="userInfo">
       <h3>{displayName}</h3>
       <p>{email}</p>
       </div>
      </div>

      <div className="savedMeals">
      <h2>My saved meals </h2>
      </div>
    </div>
  )
};

export default Dashboard;
