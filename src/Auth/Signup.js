import React, {useState} from 'react';
import firebase from '../firebase/firebase';

function Signup () {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name,setName] = useState('');
  const [error, setError] = useState(null);

    //making the post reques to firebase
    const handleSubmit = (e) => {
      //preventing the default behavior
        e.preventDefault();
        //making the request
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(result => {
            if(result) {
              result.user.updateProfile({
                displayName: name
              })
            }
          })
    };


  return(
    <div className="signupContainer" style={{marginTop: '80px'}}>
     {error && <p>Something went wrong</p>}
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
