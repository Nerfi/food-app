import React,{useState} from 'react';
import firebase from '../firebase/firebase';
import './Login.css';

function Login () {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);


  return(
    <div className="loginContainer">
     <h2>Login!</h2>
    <form onSubmit={""}>
      <label>Email</label>
      <input type="email" name="email" value={email} placeholder="enter email" onChange={(e) => setEmail(e.target.value)}/>
      <label>Password</label>
      <input type="password" name="password" value={password} placeholder="enter password" onChange={(e) => setPassword(e.target.value)}/>

    </form>

     <p style={{marginTop: '80px'}}>working</p>
    </div>
    )
}

export default Login;
