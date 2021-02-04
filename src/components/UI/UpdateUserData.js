import React, {useState, useContext, useRef} from 'react';
import './UpdateUserData.css';
import { UserContext} from '../../AuthContext/UserContext';
import  {storage, firebase} from '../../firebase/firebase';
import {useHistory, Link} from 'react-router-dom';
import { Form, Button, Card, Alert } from "react-bootstrap"


const UpdateUserData = () => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [repeatPassword, setRepeatPassword] = useState('');
const [error, setError] = useState(null);
const [name, setName] = useState('');
//img upload state
const [selcectedPhoto, setSelectedPhoto] = useState('');
//creating the ref
let imgRef = useRef();


console.log( typeof selcectedPhoto, 'selcectedPhoto') //string




const history = useHistory();

//this are the new values that aI will use from now on.
const {
  updateEmail,
  user,
  updatePassword,
 updateUserName
 /*setUserProfilePhoto*/
} = useContext(UserContext);




//const new function in order to update the user data
//this is not an async function because we are resolving all the promises this component has in one place , Promise.all(promises); check docs for more info
const handleUserUpdate = (e) => {

  e.preventDefault();


  if(password !== repeatPassword) {

    setError('Password do not match');
    setPassword('');
    setRepeatPassword('');
  }

  //creating promises array in order to run all Promises at once
  const promises = [];


  if(email !== user.email) {
    promises.push(updateEmail(email))
  }

  if(password ) {
    promises.push(updatePassword(password))
  }
  if(name !== user.displayName ) {
    promises.push(updateUserName(name))
  }
/*
  if(selcectedPhoto) {
    promises.push(onFileChange(selcectedPhoto))
  }
*/

  //resolving all the promises at once
  Promise.all(promises).then(() => {
    history.push("/dashboard");

  }).catch((error) => {
    setError('Failed to update profile' + ' ' + error.message)
    setName('')
    setPassword('');
    setRepeatPassword('');
  })

};



const onFileChange = async (e) => {
 //imgRef.current = e.target.files[0];
 //e.preventDefault();
 imgRef = e.target.files[0];

 console.log(e.target.files, 'files target');
//const uploadTask = storage.ref().child('images/' + imgRef.name).put(imgRef)
 const uploadTask  = storage.ref().child('images/' + 'test.png').put(imgRef);
 await uploadTask
 .then((snapshot) => snapshot.ref.getDownloadURL())
 .then((url) => {
    console.log(url, 'here is the url');
    setSelectedPhoto(url);
    updateUserName({ photoURL: url})
  });
}


  return(
     <>
      <Card>
        <Card.Body>

          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleUserUpdate}>

            <Form.Group id="img">
              <Form.Label>Select profile picture</Form.Label>
              <Form.Control
                type="file"
                onChange={onFileChange}
                required
              />

            </Form.Group>

             <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                placeholder={user?.displayName}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={user?.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep the same"

              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Button disabled={!user} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>

  )
};


export default UpdateUserData;
