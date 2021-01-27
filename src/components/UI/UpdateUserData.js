import React, {useState, useContext} from 'react';
import './UpdateUserData.css';
import { UserContext} from '../../AuthContext/UserContext';
import  {storage, firebase} from '../../firebase/firebase';


const UpdateUserData = () => {

  const {
    displayName,
    email,
   photoURL
 } = useContext(UserContext);



  return(
    <div className="updateContainer">
    <div className="formWrap">
    <div className="formContent">
      <form  className="formForm">
        <h2 className="updateHeader">Update your profile</h2>
        <label  className="formLabel" required>User name</label>
        <input type="text" placeholder="set user name" className="formInput"/>
        <label className="formLabel">Email</label>
        <input type="email" className="formInput" placeholder="set email" required onChange={"run onchange function, think about it later"}/>
        <label className="formLabel">Select and Image</label>
        <input type="file" className="formInput"/>
      </form>

    </div>

    </div>
    </div>
  )
};


export default UpdateUserData;
