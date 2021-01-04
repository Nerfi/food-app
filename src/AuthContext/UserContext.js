import React,{useState, useEffect} from 'react';
import { createContext } from "react";
import firebase from '../firebase/firebase';

  // 1- creating the context Hook
 const UserContext = createContext(null);

 /*
  we create a fucntion that Will handle the changes on the state, in this
  case  we will listen to when the Auth state changes in the user, it might be
  sign in, login out sign up,HOC
*/

 function UserAuth (props) {

  const [user, setUser] = useState(null);

  useEffect(() => {
      //onauthStatechange is a hook that will listen whenever the user is logged in or logged out  in the app just that
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);

    });
    console.log(user, 'user')

  },[user]);

     /* every context object has a provider , the mission of this provider is to
    PROVIDE the value that we pass in as a defualt value , that way all the components
    around this HOC will be able to use this state
    */
    return(
      <UserContext.Provider value={user}>
        {props.children}
      </UserContext.Provider>
    )

 };

export {UserContext, UserAuth};
