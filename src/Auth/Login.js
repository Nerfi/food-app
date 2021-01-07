import React,{useState} from 'react';
import firebase from '../firebase/firebase';
import './Login.css';
import {useHistory, Link} from 'react-router-dom';

function Login () {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const history = useHistory();


  //login user in
const loginUser = (e) => {
  e.preventDefault();

  try {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      history.push("/")
    })
    .catch((e) => {
      setError(e.message)
    })

  } catch(e) {
    setError(e.message)
  }

};


  return(
    <div className="loginContainer">

    <form onSubmit={loginUser} className="loginForm">
    {error && <p>{error}</p>}

      <h2 className="loginH2">Login!</h2>
      <label>Email</label>
      <div className="input">
       <input type="email" name="email" value={email} placeholder="enter email" onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <label>Password</label>
      <div>
      <input type="password" name="password" value={password} placeholder="enter password" onChange={(e) => setPassword(e.target.value)}/>

      </div>
      <button type="submit" className="submit">
        Login
      </button>

      <div className="alreadyAccount">
       <p>don't have an account ? <Link to="Signup" >Sign up !</Link> </p>

      </div>

    </form>

    </div>
    )
}

export default Login;
