import React,{useState,useContext} from  'react';
import { UserContext} from '../../AuthContext/UserContext';
import {Navbar} from 'react-bootstrap';
import firebase from '../../firebase/firebase';
import {useHistory} from 'react-router-dom';

function NavbarFood() {

  const user = useContext(UserContext);
  const history  = useHistory();
  const [error, setError] = useState(null);

    const signOutUSer = async () => {

      await firebase.auth().signOut().then(() => {
        history.push("/");

      }).catch((error) => {
     // An error happened.
     setError(error.message)
    });
  }

  return(
    <Navbar style={{zIndex: 1 }} fixed="top" bg="light">
    <Navbar.Brand href="/"><span style={{color: '#ff0157'}}>F</span>oodied</Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text style={{padding: '20px'}}>
      {user ? `${user.displayName}` : ""}
      </Navbar.Text>

    {
      user ? <>
       <Navbar.Text style={{paddingLeft: '10px'}} onClick={signOutUSer} style={{cursor: 'pointer'}}>
      Signout
     </Navbar.Text>

     <Navbar.Text style={{paddingRight: '15px'}} onClick={() => history.push("/ashboard")} style={{cursor: 'pointer'}}>
       Dashboard
     </Navbar.Text>
     </>
      :
       <Navbar.Text style={{paddingLeft: '15px'}} onClick={() =>  history.push('/login') } style={{cursor: 'pointer'}}>
       login
      </Navbar.Text>
    }


  </Navbar.Collapse>
</Navbar>
  );
};


export  default NavbarFood;
