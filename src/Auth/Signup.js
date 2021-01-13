import React, {useState} from 'react';
import firebase from '../firebase/firebase';
import './Signup.css';
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

      try {

          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(result => {
              console.log(result,  'result')
              if(result) {

                result.user.updateProfile({
                displayName: name
              })
                history.push('/');
              }

              firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
                email: email,
                name: name
              })
            }).catch(e => setError(e.message))
        } catch(error) {
          setError(error.message)
        }

    };




  return(
    <div className="signupContainer" style={{marginTop: '100px'}}>
    <form onSubmit={handleSubmit} className="formContainer">
     {error && error}
     <div className="signupSpan">Sign up! </div>
     <label className='emailLabel'>Email</label>
     <div className="input">
      <input type="email" required name="email" placeholder="enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
     </div>
     <label>Password</label>
     <div className="input">
     <input type="password" required name="password" placeholder="enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
     </div>
     <label>User Name</label>
     <div className="input">
     <input type="text" placeholder="choose user name" required onChange={(e) => setName(e.target.value)} value={name}/>
     </div>
     <button type="submit" className="btn__signin">Submit</button>
    </form>
    </div>
  )
}

export default Signup;
