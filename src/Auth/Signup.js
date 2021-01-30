import React, {useState, useContext} from 'react';
import {firebase} from '../firebase/firebase';
import './Signup.css';
import { useHistory } from "react-router-dom";
import {UserContext} from '../AuthContext/UserContext';


function Signup () {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const [name,setName] = useState('');
  const [error, setError] = useState(null);
  const {signUp} = useContext(UserContext);
  const history = useHistory();


    const handleSubmit = async (e) => {

      e.preventDefault();

      try {

        await signUp(email, password).then( res => {
          if(res) {

              res.user.updateProfile({
                displayName: name
              })

            history.push('/');
          }

        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
          email: email,
          name: name
        });


     })

      }catch(e) {
        setError(e.message);
      }

    };


  return(
    <div className="signupContainer" style={{marginTop: '100px'}}>
    <form onSubmit={handleSubmit} className="formContainer">
     {error && error}
     <div className="signupSpan">Sign up! </div>
     <label className='emailLabel'>Email</label>
     <div className="input">
      <input type="email" required name="email"  placeholder="enter email" value={email}  onChange={(e) => setEmail(e.target.value)}/>
     </div>
     <label>Password</label>
     <div className="input">
     <input type="password" required name="password" placeholder="enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
     </div>
      <label>Repeat Password</label>
     <div className="input">
     <input type="password" required name="password" placeholder="enter password" value={resetPassword} onChange={(e) => setResetPassword(e.target.value)}/>
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
