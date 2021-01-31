import React, {useState, useContext} from 'react';
import './UpdateUserData.css';
import { UserContext} from '../../AuthContext/UserContext';
import  {storage, firebase} from '../../firebase/firebase';
import {useHistory} from 'react-router-dom';


const UpdateUserData = () => {

  const [newEmail, setNwEmail] = useState('');
  const [newName, setNwName] = useState('');
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const [image, setImage] = useState(null);
  const history = useHistory();

  const {
    displayName,
    email,
   photoURL
 } = useContext(UserContext);
 //delte after checke all work out
const currentUser = firebase.auth().currentUser;

const {updateEmail, user} = useContext(UserContext)


//update name and url function
const updateData = async (name, photoURL,e) => {
  e.preventDefault()

  if(name && photoURL != '') {

    await currentUser.updateProfile({
      displayName: name,
      photoURL: photoURL
    }).then(() => {
      history.push('/')
    }).catch(e => setError(e.message))
  }
}

//update email function
const updateEmial = async (email) => {

    if(newEmail != null) {
      await currentUser.updateEmail(email).then(() => {
        history.push('/')
      }).catch(e =>  setError(e.message))
    }
};


//handle image selection
const handleChange = (e) => {

  let selected = e.target.files[0];

  if(selected) {
      setImage(selected);
      setError('');

  }else {
    setImage(null)
    setError('please select an image!');
  }
}

const handleImgUpload = async () => {

  if(image) {
   const uploadImg = storage.ref(`images/${image.name}`);

    uploadImg.put(image).on("state_changed", () => {

    },(error) => {
      setError(error.message);
    },
    async () => {
      storage
      .ref('images')
      .child(image.name)
      .getDownloadURL()
      .then(url =>{
        setUrl(url);
      })
    }
    )

  }
};


//upload image , name , email function

const updateProfileData = (e) => {
  e.preventDefault();

if(newEmail && newName && image && url) {
    handleImgUpload();
    updateEmial(newEmail);
    updateData(newName, url);
    history.push("/dashboard")

}else {
  alert('something went wrong')
}

};


//update email funcion in order to see if this works

const updateEmial2 = async (e) => {
  e.preventDefault();

  //tengo user and update email function

  if(newEmail !== user.email ) {
    await updateEmail(newEmail)
         .then(() => {
          history.push("/dashboard")
        })
  }
};

  return(
    <div className="updateContainer">
    <div className="formWrap">
    <div className="formContent">
    {error && <p>Something went wrong {error}</p>}
      <form  className="formForm" onSubmit={updateEmial2}>
        <h2 className="updateHeader">Update your profile</h2>
        <label  className="formLabel" required>{displayName}</label>
        <input type="text"
        placeholder="new user name"
        className="formInput"

        onChange={(e) => setNwName(e.target.value)}
        value={newName}
        />
        <label className="formLabel">{email}</label>

        <input type="email"
        className="formInput"
        placeholder=" new email"
        required
        onChange={(e) => setNwEmail(e.target.value)}
        value={newEmail}
        />

        <label className="formLabel">Select and Image</label>
        <input type="file" className="formInput"  onChange={handleChange}/>
        <button type="submit" style={{marginTop: '-50px'}}></button>
      </form>

    </div>

    </div>
    </div>
  )
};


export default UpdateUserData;
