import React, {useState} from 'react';
import firebase from '../firebase/firebase';
import { useHistory } from "react-router-dom";


function Signup () {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name,setName] = useState('');
  const [error, setError] = useState(null);

    const history = useHistory();

    //making the post reques to firebase
    const handleSubmit = (e) => {
      e.preventDefault();


        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(result => {
            if(result) {
              history.push('/');
            }

            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
              email: email,
              name: name
            })
          }).catch(error => setError(error))
    };




  return(
    <div className="signupContainer" style={{marginTop: '80px'}}>
     {error && error}
    <form onSubmit={handleSubmit}>
     <label>Email</label>
     <input type="email" name="email" placeholder="enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
     <label>Password</label>
     <input type="password" name="password" placeholder="enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
     <label>User Name</label>
     <input type="text" placeholder="choose user name" required onChange={(e) => setName(e.target.value)} value={name}/>
     <button type="submit" className="btn__signin">Submit</button>
    </form>
    </div>
  )
}

export default Signup;
